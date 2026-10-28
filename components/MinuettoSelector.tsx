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
    <fieldset className="source-selector">
      <legend>Include in randomisation</legend>
      <div className="source-options">
        {alphabet.map((letter) => (
          <label key={letter}>
            <input
              checked={selectedLetters.includes(letter.toLowerCase())}
              onChange={() => onToggle(letter.toLowerCase())}
              type="checkbox"
              value={letter.toLowerCase()}
            />
            <span>{letter}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
