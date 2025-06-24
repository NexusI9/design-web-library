import { modulesSearchSchema } from "src/routes/glm";
import { IModuleFrameInputBase } from "./ModuleInput";
import ModuleInputNumber from "./ModuleInputNumber";
import ModuleInputSelect, { IInputSelectValue } from "./ModuleInputSelect";
import { messageProcessor } from "@components/Modules/glm/lib/message-processor";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";

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

const ModuleInputSection = ({
  frame,
  inputs,
  channel,
}: IModuleInputSection) => {
  const searchParams = useSearch({ from: location.pathname });
  const navigate = useNavigate({ from: location.pathname });

  const onInputChange = (value: string, attribute: string) => {
    //update iframe
    frame &&
      messageProcessor.send(frame, {
        channel,
        attribute: attribute,
        value,
      });

    // update url parameters
    navigate({
      search: ((prev: any) => ({ ...prev, [attribute]: String(value) })) as any,
    });
  };

  const urlValue = (param: string) => {
    return searchParams[param] || undefined;
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
                defaultValue={
                  urlValue(input.targetAttribute) || input.defaultValue
                }
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

export default ModuleInputSection;
