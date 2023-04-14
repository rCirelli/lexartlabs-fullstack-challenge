export default function Dropdown({
  inputName,
  options,
}: {
  inputName: string;
  options: string[];
}) {
  return (
    <select name={inputName}>
      {options.length > 0 &&
        options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
    </select>
  );
}
