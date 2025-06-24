import "./index.scss";

export interface IInputSelectValue {
  label: string;
  value: string;
}

interface IInputSelect {
  values: IInputSelectValue[];
  defaultIndex: number;
  onChange: (index: number, value: string) => void;
}

export default ({ values, defaultIndex, onChange }: IInputSelect) => {
    
  return (
    <select
      className="module-input"
      onChange={(e) =>
        onChange && onChange(e.target.selectedIndex, e.target.value)
      }
    >
      {values.map((val, i) => (
          <option key={val.label + i} value={String(val.value)} selected={defaultIndex == i}>
          {String(val.label)}
        </option>
      ))}
    </select>
  );
};
