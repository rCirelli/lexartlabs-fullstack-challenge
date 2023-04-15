import { ChangeEventHandler } from "react";

export default function Dropdown({
  inputName,
  options,
  handler,
}: {
  inputName: string;
  options: string[];
  handler: ChangeEventHandler;
}) {
  return (
    <select name={inputName} onChange={handler} value={options[0]}>
      <option disabled>{inputName}</option>
      {options.length > 0 &&
        options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
    </select>
  );
}
