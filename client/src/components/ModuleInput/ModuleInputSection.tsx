import { createElement, useEffect } from "react";
import { IModuleFrameInputBase } from "./ModuleInput";
import ModuleInputNumber from "./ModuleInputNumber";
import ModuleInputSelect, { IInputSelectValue } from "./ModuleInputSelect";
import { messageProcessor } from "@components/Modules/glm/lib/message-processor";

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

export type ModuleSectionInputs = (
  | IModuleInputSectionSelect
  | IModuleInputSectionNumber
)[];

export interface IModuleInputSection {
  frame: HTMLIFrameElement;
  inputs: ModuleSectionInputs;
  channel: string;
}

export default ({ frame, inputs, channel }: IModuleInputSection) => {

  const onInputChange = (value: string, attribute: string) => {
    frame &&
      messageProcessor.send(frame, {
        channel,
        attribute: attribute,
        value,
      });
  };

  return (
    <div className="module-input-section flex f-row gap-3xl">
      {inputs.map((input) => {
        let Input;

        switch (input.type) {
          case "INPUT_NUMBER":
            Input = (
              <ModuleInputNumber
                min={input.min}
                max={input.max}
                defaultValue={input.defaultValue}
                onChange={(value) =>
                  onInputChange(value, input.targetAttribute)
                }
              />
            );

            break;

          case "INPUT_SELECT":
            Input = (
              <ModuleInputSelect
                values={input.values}
                defaultIndex={input.defaultIndex}
                onChange={(value) =>
                  onInputChange(value, input.targetAttribute)
                }
              />
            );
            break;
          default:
        }

        return (
          <label key={input.name + input.label} className="flex f-col gap-s">
            <p>
              <small>{input.label}</small>
            </p>
            {Input}
          </label>
        );
      })}
    </div>
  );
};
