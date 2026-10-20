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
    <div className="row mx-0 mb-3 py-3 text-center">
      {minuetti.map((minuetto) => (
        <button
          className={`btn col-6 col-md-3 individual-minuetto btn-primary btn-lg ${playingMinuetto === minuetto.name ? "minuetto-playing" : ""
            }`}
          key={minuetto.name}
          onClick={(event) => {
            event.currentTarget.blur();
            onMinuettoClick(minuetto);
          }}
        >
          {minuetto.name}
        </button>
      ))}
    </div>
  );
}
