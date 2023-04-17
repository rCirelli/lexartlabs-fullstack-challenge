import { ChangeEventHandler } from "react";

export default function Dropdown({
  inputName,
  options,
  optionNames = [...options],
  handler,
  value,
}: {
  inputName: string;
  options: string[];
  optionNames?: string[];
  handler: ChangeEventHandler;
  value: string;
}) {
  return (
    <select name={inputName} onChange={handler} value={value}>
      <option disabled>{inputName}</option>
      {options.length > 0 &&
        options.map((option, i) => (
          <option value={option} key={option}>
            {optionNames[i]}
          </option>
        ))}
    </select>
  );
}
