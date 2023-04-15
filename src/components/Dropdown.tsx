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
    <select name={inputName} onChange={handler}>
      <option disabled selected>{inputName}</option>
      {options.length > 0 &&
        options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
    </select>
  );
}
