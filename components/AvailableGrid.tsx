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
  return (
    <div id="available-grid">
      {alphabet.map((letter) => (
        <div
          className="row no-gutters"
          key={letter}
        >
          {Array.from({ length: 12 }, (_, index) => {
            const number = index + 1;
            const id = `${letter.toLowerCase()}${number < 10 ? `0${number}` : number
              }`;

            const isSelected = randomIDs.includes(id);

            return (
              <div
                className="col-1"
                key={id}
              >
                <button
                  className={`btn bar song ${playingBar === id ? "playing" : isSelected ? "selected" : ""
                    }`}
                  disabled={isPlayingSequence}
                  id={id}
                  onClick={() => onBarClick(id)}
                >
                  {id.toUpperCase()}
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
