interface RadioButtonProps {
  name: string;
  options: string[];
  value: string;
  handleSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtons = ({
  name,
  options,
  value,
  handleSelection,
}: RadioButtonProps) => (
  <div role="radiogroup">
    {name}:
    {options.map((option) => (
      <label key={option} style={{ marginRight: 10 }}>
        <input
          type="radio"
          name={option}
          value={option}
          checked={value === option}
          onChange={handleSelection}
        />
        {option}
      </label>
    ))}
  </div>
);

export default RadioButtons;
