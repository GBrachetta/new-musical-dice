"use client";

import { useRef, useState } from "react";
import { Howl } from "howler";

import AvailableGrid from "@/components/AvailableGrid";

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
  const currentMinuetto = useRef<Howl | null>(null);
  const currentMinuettoName = useRef<string | null>(null);
  const currentBar = useRef<Howl | null>(null);
  const sequenceSounds = useRef<Howl[]>([]);
  const sequenceRun = useRef(0);

  const [playingMinuetto, setPlayingMinuetto] = useState<string | null>(null);
  const [selectedLetters, setSelectedLetters] = useState<string[]>(
    alphabet.map((letter) => letter.toLowerCase()),
  );
  const [playingBar, setPlayingBar] = useState<string | null>(null);
  const [randomIDs, setRandomIDs] = useState<string[]>([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [hasPlayedSequence, setHasPlayedSequence] = useState(false);
  const orderedLetters = alphabet
    .map((letter) => letter.toLowerCase())
    .filter((letter) => selectedLetters.includes(letter));
  const combinationNumber =
    randomIDs.reduce(
      (number, id) =>
        number * orderedLetters.length + orderedLetters.indexOf(id[0]),
      0,
    ) + 1;

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
    currentMinuetto.current?.stop();
    currentBar.current?.stop();

    for (const sound of sequenceSounds.current) sound.stop();

    sequenceRun.current += 1;

    currentMinuetto.current = null;
    currentMinuettoName.current = null;
    currentBar.current = null;

    setPlayingMinuetto(null);
    setPlayingBar(null);
    setIsPlayingSequence(false);
    setHasPlayedSequence(false);
  };

  const handleMinuettoClick = (minuetto: Minuetto) => {
    const isSameMinuetto = currentMinuettoName.current === minuetto.name;

    if (isSameMinuetto) {
      currentMinuetto.current?.stop();
      currentMinuetto.current = null;
      currentMinuettoName.current = null;
      setPlayingMinuetto(null);

      return;
    }

    stopAllAudio();

    const sound = new Howl({
      onend: () => {
        currentMinuetto.current = null;
        currentMinuettoName.current = null;
        setPlayingMinuetto(null);
      },
      src: [minuetto.path],
    });

    currentMinuetto.current = sound;
    currentMinuettoName.current = minuetto.name;
    setPlayingMinuetto(minuetto.name);

    sound.play();
  };

  const randomise = () => randomiseSelection(selectedLetters);

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

    const sound = new Howl({
      onend: () => {
        currentBar.current = null;
        setPlayingBar(null);
      },
      src: [`/assets/music/cells/${id}.mp3`],
    });

    currentBar.current = sound;
    setPlayingBar(id);
    sound.play();
  };

  const createSequence = (ids: string[]) => {
    for (const sound of sequenceSounds.current) sound.unload();

    const sounds = ids.map(
      (id) =>
        new Howl({
          src: [`/assets/music/randomiser/${id}.mp3`],
        }),
    );

    sequenceSounds.current = sounds;
  };

  const playSequence = () => {
    if (randomIDs.length !== 12) {
      return;
    }

    const sounds = sequenceSounds.current;

    stopAllAudio();

    const run = sequenceRun.current;

    let currentIndex = 0;

    const playNext = () => {
      if (run !== sequenceRun.current) {
        return;
      }

      if (currentIndex >= sounds.length) {
        setIsPlayingSequence(false);
        setPlayingBar(null);
        setHasPlayedSequence(true);

        return;
      }

      const id = randomIDs[currentIndex];
      const sound = sounds[currentIndex];

      setPlayingBar(id);

      sound.once("end", () => {
        if (run !== sequenceRun.current) {
          return;
        }

        currentIndex++;
        playNext();
      });

      sound.play();
    };

    setIsPlayingSequence(true);
    setHasPlayedSequence(false);
    playNext();
  };

  return (
    <div className="music-workbench container">
      <div className="section-heading">
        <div>
          <h2>The original minuetti</h2>
        </div>
      </div>

      <MinuettoList
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
              playSequence();
            }
          }}
        >
          <i
            aria-hidden="true"
            className={`fa-solid ${isPlayingSequence ? "fa-stop" : "fa-play"}`}
          />
          {isPlayingSequence
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
