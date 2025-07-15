import "./index.scss";

export interface IInputSelectValue {
  label: string;
  value: string;
}

export interface IInputSelect {
  values: IInputSelectValue[];
  defaultIndex: number;
  onChange: (index: number, value: string) => void;
}

export default ({ values, defaultIndex, onChange }: IInputSelect) => {

  return (
    <select
      className="module-input"
      defaultValue={String(values[defaultIndex]?.label)}
      onChange={(e) =>
        onChange &&
        onChange(e.target.selectedIndex, e.target.value.toLowerCase())
      }
    >
      {values.map((val, i) => (
        <option key={val.label + i}>{String(val.label)}</option>
      ))}
    </select>
  );
};
