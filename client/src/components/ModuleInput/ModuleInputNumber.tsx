export interface IInputNumber {
  min: number;
  max: number;
  defaultValue: number;
  onChange: (value: number) => void;
}

export default ({ min, max, defaultValue, onChange }: IInputNumber) => {
  return (
    <input type="number" min={min} max={max} defaultValue={defaultValue} />
  );
};
