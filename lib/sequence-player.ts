type PlaybackCallbacks = {
  onEnd: () => void;
  onFragment: (index: number) => void;
  onStart: () => void;
};

/** Plays one assembled audio buffer; animation frames only update the UI. */
export class SequencePlayer {
  private context: AudioContext | null = null;
  private cache = new Map<string, Promise<AudioBuffer>>();
  private sources = new Set<AudioBufferSourceNode>();
  private requests = new Set<AbortController>();
  private generation = 0;
  private frame = 0;
  private disposed = false;

  private getContext() {
    if (this.disposed) throw new Error("Audio player has been disposed.");
    this.context ??= new AudioContext();

    return this.context;
  }

  private load(path: string): Promise<AudioBuffer> {
    const cached = this.cache.get(path);

    if (cached) return cached;

    const context = this.getContext();
    const controller = new AbortController();

    this.requests.add(controller);
    const pending = fetch(path, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${path}`);

        return response.arrayBuffer();
      })
      .then((data) => context.decodeAudioData(data))
      .catch((error: unknown) => {
        if (this.cache.get(path) === pending) this.cache.delete(path);
        throw error;
      })
      .finally(() => this.requests.delete(controller));

    this.cache.set(path, pending);

    // Keep a few recent compositions without accumulating all decoded assets.
    if (this.cache.size > 36) {
      const oldest = this.cache.keys().next().value;

      if (oldest !== undefined) this.cache.delete(oldest);
    }

    return pending;
  }

  async preload(paths: string[]) {
    await Promise.all(paths.map((path) => this.load(path)));
  }

  async play(paths: string[], callbacks: PlaybackCallbacks) {
    this.stop();
    const run = this.generation;
    const context = this.getContext();

    try {
      // Resume within the original click gesture, before fetching or decoding.
      const [, buffers] = await Promise.all([
        context.resume(),
        Promise.all(paths.map((path) => this.load(path))),
      ]);

      if (run !== this.generation) return;
      if (context.state !== "running")
        throw new Error("Audio could not start.");
      if (buffers.length === 0) return;

      const sampleRate = context.sampleRate;
      const channels = Math.max(
        ...buffers.map((buffer) => buffer.numberOfChannels),
      );
      const length = buffers.reduce(
        (total, buffer) => total + buffer.length,
        0,
      );
      const combined = context.createBuffer(channels, length, sampleRate);
      const offsets: number[] = [];

      let offset = 0;

      for (const buffer of buffers) {
        if (buffer.sampleRate !== sampleRate)
          throw new Error("Unexpected decoded sample rate.");
        offsets.push(offset);
        const fadeSamples = Math.min(
          Math.round(sampleRate * 0.002),
          Math.floor(buffer.length / 2),
        );

        for (let channel = 0; channel < channels; channel++) {
          const output = combined.getChannelData(channel);
          const input = buffer.getChannelData(
            Math.min(channel, buffer.numberOfChannels - 1),
          );

          output.set(input, offset);

          // Smooth only the copied samples; cached buffers and MP3s are unchanged.
          for (let sample = 0; sample < fadeSamples; sample++) {
            const gain = sample / fadeSamples;

            output[offset + sample] *= gain;
            output[offset + buffer.length - 1 - sample] *= gain;
          }
        }

        offset += buffer.length;
      }

      const start = context.currentTime + 0.03;
      const starts = offsets.map((sample) => start + sample / sampleRate);
      const source = context.createBufferSource();

      source.buffer = combined;
      source.connect(context.destination);
      this.sources.add(source);
      source.addEventListener(
        "ended",
        () => {
          this.sources.delete(source);
          source.disconnect();

          if (run === this.generation) {
            this.stop();
            callbacks.onEnd();
          }
        },
        { once: true },
      );
      source.start(start);

      let highlighted = -1;

      const updateHighlight = () => {
        if (run !== this.generation) return;
        const now = context.currentTime;

        let current = -1;

        for (const [index, start] of starts.entries()) {
          if (now >= start) current = index;
        }

        if (current >= 0 && current !== highlighted) {
          highlighted = current;
          callbacks.onFragment(current);
        }

        this.frame = requestAnimationFrame(updateHighlight);
      };

      callbacks.onStart();
      updateHighlight();
    } catch (error) {
      if (run !== this.generation) return;
      this.stop();
      throw error;
    }
  }

  stop() {
    this.generation += 1;
    cancelAnimationFrame(this.frame);
    this.frame = 0;

    for (const source of this.sources) {
      source.stop();
      source.disconnect();
    }

    this.sources.clear();
  }

  dispose() {
    this.stop();
    this.disposed = true;
    for (const request of this.requests) request.abort();
    this.requests.clear();
    this.cache.clear();
    if (this.context) void this.context.close().catch(() => {});
  }
}
