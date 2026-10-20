"use client";

import { useRef, useState } from "react";
import { Howl } from "howler";

import AvailableGrid from "@/components/AvailableGrid";
import MinuettoSelector from "@/components/MinuettoSelector";

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

  const randomise = () => {
    stopAllAudio();
    setHasPlayedSequence(false);

    const newRandomIDs: string[] = [];

    for (let index = 1; index <= 12; index++) {
      const letter = getRandomItem(selectedLetters);
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

  const handleToggleMinuetto = (letter: string) => {
    stopAllAudio();
    setHasPlayedSequence(false);

    setSelectedLetters((current) => {
      const newSelection = current.includes(letter)
        ? current.filter((item) => item !== letter)
        : [...current, letter];

      if (newSelection.length > 0) {
        const newRandomIDs: string[] = [];

        for (let index = 1; index <= 12; index++) {
          const selectedLetter = getRandomItem(newSelection);
          const number = index < 10 ? `0${index}` : `${index}`;

          newRandomIDs.push(`${selectedLetter}${number}`);
        }

        setRandomIDs(newRandomIDs);
      } else {
        setRandomIDs([]);
      }

      return newSelection;
    });
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
    <div className="container">
      <p className="lead text-center">
        <em>Click on the buttons to listen to the 12 original minuetti</em>
      </p>

      <MinuettoList
        minuetti={minuetti}
        onMinuettoClick={handleMinuettoClick}
        playingMinuetto={playingMinuetto}
      />

      <p className="lead mb-3 text-center">
        <em>
          Select below which of the above pieces you would like to include or
          exclude to randomise from (grid will be repopulated accordingly).
        </em>
      </p>

      <MinuettoSelector
        alphabet={alphabet}
        onToggle={handleToggleMinuetto}
        selectedLetters={selectedLetters}
      />

      <div className="row my-md-5 mb-4 mt-3 pt-3 text-center">
        <div className="col-12">
          <button
            className="main-action-buttons btn btn-primary btn-lg mb-1"
            disabled={selectedLetters.length < 2}
            id="btn-randomise"
            onClick={randomise}
          >
            Randomise!
          </button>
        </div>
      </div>

      <AvailableGrid
        alphabet={selectedLetters.map((letter) => letter.toUpperCase())}
        isPlayingSequence={isPlayingSequence}
        onBarClick={handleBarClick}
        playingBar={playingBar}
        randomIDs={randomIDs}
      />

      <div className="row my-md-5 mb-4 mt-3 pt-3 text-center">
        <div className="col-12">
          <button
            className="main-action-buttons btn btn-primary btn-lg mb-1"
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
            {isPlayingSequence
              ? "Stop Minuetto"
              : hasPlayedSequence
                ? "Play Again!"
                : "Play Minuetto"}
          </button>
        </div>
      </div>
    </div>
  );
}
