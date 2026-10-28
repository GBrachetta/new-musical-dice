"use client";

import { useState } from "react";

type AvailableGridProps = {
  alphabet: string[];
  randomIDs: string[];
  playingBar: string | null;
  isPlayingSequence: boolean;
  onBarClick: (id: string) => void;
};

export default function AvailableGrid({
  alphabet,
  isPlayingSequence,
  onBarClick,
  playingBar,
  randomIDs,
}: AvailableGridProps) {
  const [onlySelected, setOnlySelected] = useState(false);
  const rows = onlySelected ? alphabet : [..."ABCDEFGHIJKL"];

  return (
    <div className="fragment-grid">
      <label className="grid-filter">
        <input
          checked={onlySelected}
          onChange={(event) => setOnlySelected(event.target.checked)}
          type="checkbox"
        />
        Only show selected minuetti
      </label>
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
              <span className="fragment-row-label">{letter}</span>
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
          {onlySelected && alphabet.length === 0 && (
            <p className="empty-grid">
              Select a minuetto above to see its fragments.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
