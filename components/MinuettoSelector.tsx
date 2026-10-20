type MinuettoSelectorProps = {
  alphabet: string[];
  selectedLetters: string[];
  onToggle: (letter: string) => void;
};

export default function MinuettoSelector({
  alphabet,
  onToggle,
  selectedLetters,
}: MinuettoSelectorProps) {
  return (
    <div
      className="row checkbox-tags justify-content-center form-group mb-md-5 mx-0 mb-4 px-0 pb-0"
      id="checkboxes-minuetti"
    >
      {alphabet.map((letter, index) => {
        const value = letter.toLowerCase();

        return (
          <div
            className="col-3 col-md-2 col-lg-1"
            key={letter}
          >
            <input
              checked={selectedLetters.includes(value)}
              id={`checkbox-${index + 1}`}
              onChange={() => onToggle(value)}
              type="checkbox"
              value={value}
            />
            <label htmlFor={`checkbox-${index + 1}`}>{letter}</label>
          </div>
        );
      })}
    </div>
  );
}
