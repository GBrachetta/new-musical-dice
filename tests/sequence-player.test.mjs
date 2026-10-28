import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { afterEach, beforeEach, test } from "node:test";

import ts from "typescript";

// Compile the actual TypeScript module without introducing a test framework.
const source = ts.transpileModule(
  readFileSync(new URL("../lib/sequence-player.ts", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
const { SequencePlayer } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);

let contexts, frames, requests, responseFor;

const players = [];
const originals = Object.fromEntries(
  [
    "AudioContext",
    "fetch",
    "requestAnimationFrame",
    "cancelAnimationFrame",
  ].map((key) => [key, globalThis[key]]),
);

class FakeSource extends EventTarget {
  connect() {}
  disconnect() {
    this.disconnected = true;
  }
  start(time) {
    this.startTime = time;
  }
  stop() {
    this.stopped = true;
  }
}
class FakeBuffer {
  constructor(channels, length, sampleRate, fill = 0) {
    this.numberOfChannels = channels;
    this.length = length;
    this.sampleRate = sampleRate;
    this.channels = Array.from({ length: channels }, () =>
      new Float32Array(length).fill(fill),
    );
  }
  getChannelData(channel) {
    return this.channels[channel];
  }
}
class FakeContext {
  currentTime = 10;
  state = "suspended";
  sources = [];
  sampleRate = 32_000;
  constructor() {
    contexts.push(this);
  }
  async resume() {
    this.state = "running";
  }
  async decodeAudioData(data) {
    return new FakeBuffer(2, data.frames ?? 72_000, this.sampleRate, 1);
  }
  createBuffer(channels, length, sampleRate) {
    return new FakeBuffer(channels, length, sampleRate);
  }
  createBufferSource() {
    const source = new FakeSource();

    this.sources.push(source);

    return source;
  }
  async close() {
    this.state = "closed";
  }
}
const response = (frames = 72_000) => ({
  arrayBuffer: async () => ({ frames }),
  ok: true,
});

function player() {
  const instance = new SequencePlayer();

  players.push(instance);

  return instance;
}

function callbacks() {
  const events = { ends: 0, fragments: [], starts: 0 };

  return {
    events,
    onEnd: () => events.ends++,
    onFragment: (index) => events.fragments.push(index),
    onStart: () => events.starts++,
  };
}

function tick(time) {
  contexts[0].currentTime = time;
  const current = [...frames.values()];

  frames.clear();
  for (const frame of current) frame();
}

beforeEach(() => {
  contexts = [];
  frames = new Map();
  requests = [];
  responseFor = () => response();
  globalThis.AudioContext = FakeContext;

  globalThis.fetch = async (path, options) => {
    requests.push({ path, ...options });

    return responseFor(path);
  };

  let frameId = 0;

  globalThis.requestAnimationFrame = (callback) => {
    frames.set(++frameId, callback);

    return frameId;
  };

  globalThis.cancelAnimationFrame = (id) => frames.delete(id);
});
afterEach(() => {
  for (const instance of players.splice(0)) instance.dispose();

  for (const [key, value] of Object.entries(originals)) {
    if (value === undefined) delete globalThis[key];
    else globalThis[key] = value;
  }
});

test("assembles one continuous source and tracks fragment boundaries by sample offset", async () => {
  responseFor = (path) => response(path === "first" ? 72_000 : 80_000);
  const p = player(),
    callback = callbacks();

  await p.play(["first", "second", "third"], callback);
  const sources = contexts[0].sources;

  assert.equal(sources.length, 1);
  assert.equal(sources[0].buffer.length, 72_000 + 80_000 + 80_000);
  assert.equal(sources[0].startTime, 10.03);

  assert.equal(callback.events.starts, 1);
  assert.deepEqual(callback.events.fragments, []);
  tick(10.04);
  tick(sources[0].startTime + 72_000 / 32_000 + 0.001);
  assert.deepEqual(callback.events.fragments, [0, 1]);
  // A delayed UI frame catches up without changing audio scheduling.
  tick(sources[0].startTime + (72_000 + 80_000) / 32_000 + 0.1);
  assert.deepEqual(callback.events.fragments, [0, 1, 2]);
  sources[0].dispatchEvent(new Event("ended"));
  assert.equal(callback.events.ends, 1);
  assert.equal(frames.size, 0);
});

test("waits for every fragment to load and reuses preloaded buffers on replay", async () => {
  const slow = Promise.withResolvers();

  responseFor = (path) => (path === "slow" ? slow.promise : response());
  const p = player(),
    callback = callbacks();
  const playing = p.play(["fast", "slow"], callback);

  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(contexts[0].sources.length, 0);
  slow.resolve(response());
  await playing;
  assert.equal(contexts[0].sources.length, 1);
  await p.play(["fast", "slow"], callbacks());
  assert.equal(requests.length, 2);
});

test("cancelling while loading prevents the old composition from starting", async () => {
  const slow = Promise.withResolvers();

  responseFor = () => slow.promise;
  const p = player(),
    callback = callbacks();
  const playing = p.play(["slow"], callback);

  p.stop();
  slow.resolve(response());
  await playing;
  assert.equal(contexts[0].sources.length, 0);
  assert.equal(callback.events.starts, 0);
});

test("stopping cancels all scheduled sources and ignores late end events", async () => {
  const p = player(),
    callback = callbacks();

  await p.play(["first", "second"], callback);
  const sources = contexts[0].sources;

  p.stop();
  assert.ok(sources.every((source) => source.stopped && source.disconnected));
  sources[0].dispatchEvent(new Event("ended"));
  assert.equal(callback.events.ends, 0);
  assert.equal(frames.size, 0);
});

test("failed downloads can be retried instead of remaining in the cache", async () => {
  responseFor = () => ({ ok: false });
  const p = player();

  await assert.rejects(p.play(["missing"], callbacks()), /Unable to load/);
  responseFor = () => response();
  await p.play(["missing"], callbacks());
  assert.equal(requests.length, 2);
  assert.equal(contexts[0].sources.length, 1);
});

test("dispose aborts pending requests and closes the audio context", async () => {
  const slow = Promise.withResolvers();

  responseFor = () => slow.promise;
  const p = player(),
    callback = callbacks();
  const playing = p.play(["slow"], callback);

  p.dispose();
  assert.ok(requests[0].signal.aborted);
  assert.equal(contexts[0].state, "closed");
  slow.resolve(response());
  await playing;
  assert.equal(callback.events.starts, 0);
});

test("copies D03 and F04 without inserting or removing samples, and leaves decoded buffers intact", async () => {
  const p = player();

  await p.play(["d03", "f04"], callbacks());
  const context = contexts[0];
  const source = context.sources[0];
  const output = source.buffer.getChannelData(0);

  assert.equal(source.buffer.length, 144_000);
  assert.equal(output[1000], 1);
  assert.equal(output[72_000 - 1], 0);
  assert.equal(output[72_000], 0);
  assert.equal(output[72_000 + 1000], 1);
  // Replay from cached data must not compound the edge fades.
  await p.play(["d03", "f04"], callbacks());
  assert.deepEqual(context.sources[1].buffer.getChannelData(0), output);
  assert.equal(requests.length, 2);
});
