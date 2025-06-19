export interface IInputSelectValue {
  label: string;
  value: string;
}

interface IInputSelect {
  values: IInputSelectValue[];
  defaultIndex: number;
  onChange: (values: IInputSelectValue) => void;
}

export default ({ values, defaultIndex, onChange }: IInputSelect) => {
  const spliced_values = [...values];
  spliced_values.splice(defaultIndex, 1);

  return (
    <select>
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
