import { TModuleSectionInputs } from "./types";
import ModuleInputNumber from "./Number";
import ModuleInputSelect from "./Select";
import { useNavigate, useSearch } from "@tanstack/react-router";

export interface IModuleInputSection {
  className?: string;
  inputs: TModuleSectionInputs;
}

const ModuleInputSection = ({ inputs, className }: IModuleInputSection) => {
  const searchParams = useSearch({ strict: false });
  const navigate = useNavigate({ from: location.pathname });

  const onInputChange = (value: string, attribute: string) => {
    // update url parameters
    navigate({
      search: ((prev: any) => ({ ...prev, [attribute]: String(value) })) as any,
    });
  };

  const urlValue = (param: string) => {
    return searchParams[param] || undefined;
  };

  return (
    <div className={`module-input-section ${className || ""}`}>
      {inputs.map((input) => {
        let Input;

        switch (input.type) {
          case "INPUT_NUMBER":
            const attributeIndexNumber = urlValue(input.targetAttribute);

            Input = (
              <ModuleInputNumber
                min={input.min}
                max={input.max}
                defaultValue={
                  attributeIndexNumber >= 0
                    ? attributeIndexNumber
                    : input.defaultValue
                }
                onChange={(value) =>
                  onInputChange(value, input.targetAttribute)
                }
              />
            );

            break;

          case "INPUT_SELECT":
            const attributeIndexSelect = input.values
              .map(({ value }) => value)
              .indexOf(urlValue(input.targetAttribute));

            Input = (
              <ModuleInputSelect
                values={input.values}
                defaultIndex={
                  attributeIndexSelect >= 0
                    ? attributeIndexSelect
                    : input.defaultIndex
                }
                onChange={(_, value) =>
                  onInputChange(value, input.targetAttribute)
                }
              />
            );
            break;
          default:
        }

        return (
          <label
            key={input.name + input.label}
            className="flex f-col flex-no-shrink gap-s"
          >
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
