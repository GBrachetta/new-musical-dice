export type Minuetto = {
  name: string;
  path: string;
};

type MinuettoListProps = {
  minuetti: Minuetto[];
  loadingMinuetto: string | null;
  playingMinuetto: string | null;
  onMinuettoClick: (minuetto: Minuetto) => void;
};

export default function MinuettoList({
  loadingMinuetto,
  minuetti,
  onMinuettoClick,
  playingMinuetto,
}: MinuettoListProps) {
  return (
    <div className="minuetto-library">
      {minuetti.map((minuetto) => (
        <button
          aria-busy={loadingMinuetto === minuetto.name}
          aria-label={
            loadingMinuetto === minuetto.name
              ? `Cancel loading ${minuetto.name}`
              : playingMinuetto === minuetto.name
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
              className={`fa-solid ${loadingMinuetto === minuetto.name ? "fa-spinner fa-spin" : playingMinuetto === minuetto.name ? "fa-stop" : "fa-play"}`}
            />
          </span>
        </button>
      ))}
    </div>
  );
}
