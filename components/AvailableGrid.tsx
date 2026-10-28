"use client";

import { useState } from "react";

type AvailableGridProps = {
  alphabet: string[];
  randomIDs: string[];
  playingBar: string | null;
  isPlayingSequence: boolean;
  onBarClick: (id: string) => void;
  onToggle: (letter: string) => void;
};

export default function AvailableGrid({
  alphabet,
  isPlayingSequence,
  onBarClick,
  onToggle,
  playingBar,
  randomIDs,
}: AvailableGridProps) {
  const [onlySelected, setOnlySelected] = useState(false);
  const rows = onlySelected ? alphabet : [..."ABCDEFGHIJKL"];

  return (
    <div className="fragment-grid">
      <div className="grid-filter">
        <button
          aria-checked={onlySelected}
          aria-labelledby="selected-minuetti-label"
          className="row-switch"
          onClick={() => setOnlySelected(!onlySelected)}
          role="switch"
          type="button"
        >
          <span />
        </button>
        <span id="selected-minuetti-label">Only show selected minuetti</span>
      </div>
      <div
        aria-label="Musical fragments; scroll horizontally on small screens"
        className="grid-scroll"
        role="region"
        tabIndex={0}
      >
        <div id="available-grid">
          <div className="fragment-sections">
            <span />
            <span>Part A · 8 measures</span>
            <span>Part B · 16 measures</span>
          </div>
          <div className="fragment-row column-labels">
            <span />
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index}>{String(index + 1).padStart(2, "0")}</span>
            ))}
          </div>
          {rows.map((letter) => (
            <div
              className={`fragment-row ${alphabet.includes(letter) ? "" : "excluded-row"}`}
              key={letter}
            >
              <div className="fragment-row-control">
                <button
                  aria-checked={alphabet.includes(letter)}
                  aria-label={`Include Minuetto ${letter} in randomisation`}
                  className="row-switch"
                  disabled={alphabet.length <= 2 && alphabet.includes(letter)}
                  onClick={() => onToggle(letter.toLowerCase())}
                  role="switch"
                  type="button"
                >
                  <span />
                </button>
                <span className="fragment-row-label">{letter}</span>
              </div>
              {Array.from({ length: 12 }, (_, index) => {
                const id = `${letter.toLowerCase()}${String(index + 1).padStart(2, "0")}`;

                return (
                  <button
                    aria-label={`Listen to fragment ${id.toUpperCase()}${playingBar === id ? ", currently playing" : ""}`}
                    aria-pressed={randomIDs.includes(id)}
                    className={`fragment-cell ${randomIDs.includes(id) ? "selected" : ""} ${playingBar === id ? "playing" : ""}`}
                    disabled={isPlayingSequence || !alphabet.includes(letter)}
                    id={id}
                    key={id}
                    onClick={() => onBarClick(id)}
                    type="button"
                  >
                    {id.toUpperCase()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
