"use client";

import { useState } from "react";

type AvailableGridProps = {
  alphabet: string[];
  randomIDs: string[];
  playingBar: string | null;
  isPlayingSequence: boolean;
  rollCount?: number;
  onBarClick: (id: string) => void;
  onIncludeAll?: () => void;
  onSelectFragment?: (id: string) => void;
  onToggle: (letter: string) => void;
};

export default function AvailableGrid({
  alphabet,
  isPlayingSequence,
  onBarClick,
  onIncludeAll,
  onSelectFragment,
  onToggle,
  playingBar,
  randomIDs,
  rollCount = 0,
}: AvailableGridProps) {
  const [onlySelected, setOnlySelected] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const rows = onlySelected ? alphabet : [..."ABCDEFGHIJKL"];
  const activeColumn = playingBar ? Number(playingBar.slice(1)) : 0;
  const cascadeClass =
    rollCount > 0
      ? rollCount % 2 === 0
        ? "cascade-even"
        : "cascade-odd"
      : undefined;

  return (
    <div className="fragment-grid">
      <div className="grid-controls">
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
          {alphabet.length < 12 && (
            <button
              className="grid-include-all"
              onClick={onIncludeAll}
              type="button"
            >
              Include all ({alphabet.length}/12)
            </button>
          )}
        </div>
        <div className="grid-filter">
          <button
            aria-checked={selectMode}
            aria-labelledby="select-fragments-label"
            className="row-switch"
            onClick={() => setSelectMode(!selectMode)}
            role="switch"
            type="button"
          >
            <span />
          </button>
          <span id="select-fragments-label">Select fragments manually</span>
        </div>
      </div>
      <div
        aria-label="Musical fragments; scroll horizontally on small screens"
        className="grid-scroll"
        role="region"
        tabIndex={0}
      >
        <div
          className={cascadeClass}
          id="available-grid"
        >
          <div className="fragment-sections">
            <span
              className={
                activeColumn >= 1 && activeColumn <= 4
                  ? "active-section"
                  : undefined
              }
            >
              Part A · 8 measures
            </span>
            <span
              className={
                activeColumn >= 5 && activeColumn <= 12
                  ? "active-section"
                  : undefined
              }
            >
              Part B · 16 measures
            </span>
          </div>
          <div className="fragment-row column-labels">
            <span />
            {Array.from({ length: 12 }, (_, index) => (
              <span
                className={
                  activeColumn === index + 1 ? "active-column" : undefined
                }
                key={index}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
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

                const isChosen = randomIDs.includes(id);

                return (
                  <button
                    aria-label={
                      selectMode
                        ? `${isChosen ? "Deselect" : "Select"} fragment ${id.toUpperCase()}`
                        : `Listen to fragment ${id.toUpperCase()}${isChosen ? ", chosen fragment" : ""}${playingBar === id ? ", currently playing" : ""}`
                    }
                    aria-pressed={selectMode ? isChosen : undefined}
                    className={`fragment-cell ${isChosen ? "selected" : ""} ${playingBar === id ? "playing" : ""}`}
                    disabled={isPlayingSequence || !alphabet.includes(letter)}
                    id={id}
                    key={id}
                    onClick={() => {
                      if (selectMode) {
                        onSelectFragment?.(id);
                      } else {
                        onBarClick(id);
                      }
                    }}
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
