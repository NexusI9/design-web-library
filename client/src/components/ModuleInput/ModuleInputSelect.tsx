import "./index.scss";

export interface IInputSelectValue {
  label: string;
  value: string;
}

interface IInputSelect {
  values: IInputSelectValue[];
  defaultIndex: number;
  onChange: (values: string) => void;
}

export default ({ values, defaultIndex, onChange }: IInputSelect) => {
  const spliced_values = [...values];
  spliced_values.splice(defaultIndex, 1);

  return (
    <select
      className="module-input"
      onChange={(e) => onChange && onChange(e.target.value)}
    >
      <option value={String(values[defaultIndex].value)}>
        {String(values[defaultIndex].label)}
      </option>
      {spliced_values.map((val, i) => (
        <option key={val.label + i} value={String(val.value)}>
          {String(val.label)}
        </option>
      ))}
    </select>
  );
};
