import { IInputSelectValue } from "./Select";

export interface IModuleFrameInputBase {
  targetAttribute: string;
  label: string;
  name: string;
}

export interface IModuleFrameAPI {
  attribute: string;
  value: string | number;
}

export interface IModuleInputSectionSelect extends IModuleFrameInputBase {
  type: "INPUT_SELECT";
  values: IInputSelectValue[];
  defaultIndex: number;
}

export interface IModuleInputSectionNumber extends IModuleFrameInputBase {
  type: "INPUT_NUMBER";
  min: number;
  max: number;
  defaultValue: number;
}

export type TModuleSectionInputs = (
  | IModuleInputSectionSelect
  | IModuleInputSectionNumber
)[];
