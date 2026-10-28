export type Minuetto = {
  name: string;
  path: string;
};

type MinuettoListProps = {
  minuetti: Minuetto[];
  playingMinuetto: string | null;
  onMinuettoClick: (minuetto: Minuetto) => void;
};

export default function MinuettoList({
  minuetti,
  onMinuettoClick,
  playingMinuetto,
}: MinuettoListProps) {
  return (
    <div className="minuetto-library">
      {minuetti.map((minuetto) => (
        <button
          aria-label={
            playingMinuetto === minuetto.name
              ? `Stop ${minuetto.name}`
              : `Listen to ${minuetto.name}`
          }
          aria-pressed={playingMinuetto === minuetto.name}
          className={`minuetto-card ${playingMinuetto === minuetto.name ? "minuetto-playing" : ""}`}
          key={minuetto.name}
          onClick={() => onMinuettoClick(minuetto)}
          type="button"
        >
          <span className="minuetto-letter">{minuetto.name.slice(-1)}</span>
          <span className="minuetto-caption">Minuetto</span>
          <span
            aria-hidden="true"
            className="minuetto-icon"
          >
            <i
              className={`fa-solid ${playingMinuetto === minuetto.name ? "fa-stop" : "fa-play"}`}
            />
          </span>
        </button>
      ))}
    </div>
  );
}
