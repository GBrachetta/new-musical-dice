"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

import AnimatedDisclosure from "@/components/AnimatedDisclosure";
import AvailableGrid from "@/components/AvailableGrid";
import {
  combinationNumber as getCombinationNumber,
  orderSelection,
  restoreCombination,
} from "@/lib/combinations";
import { SequencePlayer } from "@/lib/sequence-player";

import MinuettoList, { type Minuetto } from "./MinuettoList";

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const minuetti: Minuetto[] = alphabet.map((letter) => ({
  name: `Minuetto ${letter}`,
  path: `/assets/music/full/minuetto${letter}.mp3`,
}));

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export default function MusicGame() {
  const currentPreview = useRef<Howl | null>(null);
  const currentMinuettoName = useRef<string | null>(null);
  const sequencePlayer = useRef<SequencePlayer | null>(null);
  const sequenceRun = useRef(0);

  const [playingMinuetto, setPlayingMinuetto] = useState<string | null>(null);
  const [loadingMinuetto, setLoadingMinuetto] = useState<string | null>(null);
  const [selectedLetters, setSelectedLetters] = useState<string[]>(
    alphabet.map((letter) => letter.toLowerCase()),
  );
  const [playingBar, setPlayingBar] = useState<string | null>(null);
  const [randomIDs, setRandomIDs] = useState<string[]>([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [hasPlayedSequence, setHasPlayedSequence] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [restored, setRestored] = useState(false);
  const [restoreNumber, setRestoreNumber] = useState("");
  const [restoreError, setRestoreError] = useState("");

  useEffect(() => {
    const parameters = new URLSearchParams(globalThis.location.search);
    const selection = orderSelection([...(parameters.get("minuetti") ?? "")]);
    const ids = restoreCombination(
      selection,
      Number(parameters.get("combination")),
    );

    startTransition(() => {
      if (ids) {
        setSelectedLetters(selection);
        setRandomIDs(ids);
      }

      setRestored(true);
    });
  }, []);

  useEffect(() => {
    if (!restored || randomIDs.length !== 12) return;
    const url = new URL(globalThis.location.href);

    url.searchParams.set("minuetti", orderSelection(selectedLetters).join(""));
    url.searchParams.set(
      "combination",
      String(getCombinationNumber(selectedLetters, randomIDs)),
    );
    globalThis.history.replaceState(globalThis.history.state, "", url);
  }, [restored, selectedLetters, randomIDs]);

  useEffect(
    () => () => {
      sequenceRun.current += 1;
      currentPreview.current?.unload();
      sequencePlayer.current?.dispose();
      sequencePlayer.current = null;
    },
    [],
  );

  const getSequencePlayer = () => {
    sequencePlayer.current ??= new SequencePlayer();

    return sequencePlayer.current;
  };
  const combinationNumber = getCombinationNumber(selectedLetters, randomIDs);

  const randomiseSelection = (letters: string[]) => {
    stopAllAudio();
    setHasPlayedSequence(false);

    const newRandomIDs: string[] = [];

    for (let index = 1; letters.length > 0 && index <= 12; index++) {
      const letter = getRandomItem(letters);
      const number = index < 10 ? `0${index}` : `${index}`;

      newRandomIDs.push(`${letter}${number}`);
    }

    setRandomIDs(newRandomIDs);
    createSequence(newRandomIDs);
  };

  const stopAllAudio = () => {
    sequenceRun.current += 1;
    currentPreview.current?.unload();
    sequencePlayer.current?.stop();

    currentPreview.current = null;
    currentMinuettoName.current = null;

    setPlayingMinuetto(null);
    setLoadingMinuetto(null);
    setPlayingBar(null);
    setIsLoading(false);
    setAudioError("");
    setIsPlayingSequence(false);
    setHasPlayedSequence(false);
  };

  const startPreview = (path: string, kind: string, onPlay: () => void) => {
    const run = sequenceRun.current;
    const fail = () => {
      if (run !== sequenceRun.current) return;
      stopAllAudio();
      setAudioError(`This ${kind} could not play. Please try again.`);
    };

    try {
      const sound = new Howl({
        onend: () => {
          if (run === sequenceRun.current) stopAllAudio();
        },
        onloaderror: fail,
        onplay: () => {
          if (run === sequenceRun.current) onPlay();
        },
        onplayerror: fail,
        preload: false,
        src: [path],
      });

      currentPreview.current = sound;
      sound.load();
      sound.play();
    } catch {
      fail();
    }
  };

  const handleMinuettoClick = (minuetto: Minuetto) => {
    const isSameMinuetto = currentMinuettoName.current === minuetto.name;

    stopAllAudio();
    if (isSameMinuetto) return;

    currentMinuettoName.current = minuetto.name;
    setLoadingMinuetto(minuetto.name);
    startPreview(minuetto.path, "minuetto", () => {
      setLoadingMinuetto(null);
      setPlayingMinuetto(minuetto.name);
    });
  };

  const randomise = () => {
    setRestoreNumber("");
    setRestoreError("");
    randomiseSelection(selectedLetters);
  };

  const handleToggleMinuetto = (letter: string) => {
    if (selectedLetters.length <= 2 && selectedLetters.includes(letter)) {
      return;
    }

    const newSelection = selectedLetters.includes(letter)
      ? selectedLetters.filter((item) => item !== letter)
      : [...selectedLetters, letter];

    setSelectedLetters(newSelection);
    randomiseSelection(newSelection);
  };

  const handleBarClick = (id: string) => {
    stopAllAudio();
    startPreview(`/assets/music/cells/${id}.mp3`, "fragment", () =>
      setPlayingBar(id),
    );
  };

  const createSequence = (ids: string[]) => {
    const run = sequenceRun.current;

    void getSequencePlayer()
      .preload(ids.map((id) => `/assets/music/randomiser/${id}.mp3`))
      .catch(() => {
        if (run === sequenceRun.current)
          setAudioError("Some fragments could not load. Press Play to retry.");
      });
  };

  const playSequence = async () => {
    if (randomIDs.length !== 12) return;

    stopAllAudio();
    const run = sequenceRun.current;

    setIsPlayingSequence(true);
    setIsLoading(true);

    try {
      await getSequencePlayer().play(
        randomIDs.map((id) => `/assets/music/randomiser/${id}.mp3`),
        {
          onEnd: () => {
            if (run !== sequenceRun.current) return;
            setIsPlayingSequence(false);
            setIsLoading(false);
            setPlayingBar(null);
            setHasPlayedSequence(true);
          },
          onFragment: (index) => {
            if (run === sequenceRun.current) setPlayingBar(randomIDs[index]);
          },
          onStart: () => {
            if (run === sequenceRun.current) setIsLoading(false);
          },
        },
      );
    } catch {
      if (run !== sequenceRun.current) return;
      stopAllAudio();
      setAudioError("The music could not be played. Please try again.");
    }
  };

  return (
    <div className="music-workbench container">
      <div className="section-heading">
        <div>
          <h2>The original minuetti</h2>
        </div>
      </div>

      <MinuettoList
        loadingMinuetto={loadingMinuetto}
        minuetti={minuetti}
        onMinuettoClick={handleMinuettoClick}
        playingMinuetto={playingMinuetto}
      />

      <div className="composition-heading section-heading">
        <div>
          <h2>Your minuetto</h2>
        </div>
      </div>
      <div className="transport">
        <button
          className="workbench-button"
          disabled={selectedLetters.length < 2}
          id="btn-randomise"
          onClick={randomise}
        >
          <i
            aria-hidden="true"
            className="fa-solid fa-shuffle"
          />
          Randomise
        </button>{" "}
        <button
          className="workbench-button workbench-primary"
          disabled={randomIDs.length !== 12}
          id="btn-play"
          onClick={() => {
            if (isPlayingSequence) {
              stopAllAudio();
            } else {
              void playSequence();
            }
          }}
        >
          <i
            aria-hidden="true"
            className={`fa-solid ${isPlayingSequence ? "fa-stop" : "fa-play"}`}
          />
          {isLoading
            ? "Cancel loading"
            : isPlayingSequence
              ? "Stop Minuetto"
              : hasPlayedSequence
                ? "Play again"
                : "Play Minuetto"}
        </button>
        <div
          aria-live="polite"
          className="combination-count"
        >
          <strong>
            {randomIDs.length === 12
              ? `Combination ${combinationNumber.toLocaleString("en-GB")}`
              : `${(selectedLetters.length ** 12).toLocaleString("en-GB")}`}
          </strong>
          <span>
            {randomIDs.length === 12
              ? `out of ${(selectedLetters.length ** 12).toLocaleString("en-GB")} possible combinations`
              : "possible combinations"}
          </span>
        </div>
      </div>
      {audioError && (
        <p
          className="audio-error"
          role="alert"
        >
          {audioError}
        </p>
      )}
      <div className="combination-restore">
        <AnimatedDisclosure title="Restore a combination">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const ids = restoreCombination(
                selectedLetters,
                Number(restoreNumber.replaceAll(/[,\s]/g, "")),
              );

              if (!ids) {
                setRestoreError(
                  `Enter a whole number from 1 to ${(selectedLetters.length ** 12).toLocaleString("en-GB")}.`,
                );

                return;
              }

              stopAllAudio();
              setRandomIDs(ids);
              setRestoreError("");
              createSequence(ids);
            }}
          >
            <label htmlFor="restore-combination-number">
              Combination number
            </label>
            <div className="restore-controls">
              <input
                id="restore-combination-number"
                inputMode="numeric"
                onChange={(event) => setRestoreNumber(event.target.value)}
                placeholder="Enter a combination number"
                required
                type="text"
                value={restoreNumber}
              />
              <button
                className="workbench-button"
                type="submit"
              >
                Restore
              </button>
            </div>
            <p>
              Uses the currently included minuetti. Reloading preserves your
              current combination; copy the page address to save it.
            </p>
            {restoreError && (
              <p
                className="audio-error"
                role="alert"
              >
                {restoreError}
              </p>
            )}
          </form>
        </AnimatedDisclosure>
      </div>
      <AvailableGrid
        alphabet={selectedLetters.map((letter) => letter.toUpperCase())}
        isPlayingSequence={isPlayingSequence}
        onBarClick={handleBarClick}
        onToggle={handleToggleMinuetto}
        playingBar={playingBar}
        randomIDs={randomIDs}
      />

      <div className="grid-legend">
        <span>
          <i className="chosen-key" /> Chosen fragment
        </span>
        <span>
          <i className="playing-key" /> Currently playing
        </span>
      </div>
    </div>
  );
}
