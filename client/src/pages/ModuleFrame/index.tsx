import { useRef } from "react";
import "./index.scss";

export interface IModuleFrame {
  frameUrl: string;
  inputs: (IModuleFrameInputNumber | IModuleFrameInputSelect)[];
}

interface IModuleFrameAPI {
  property: string;
  value: string | number;
}

interface IModuleFrameInputNumber {
  type: "INPUT_NUMBER";
  min: number;
  max: number;
  default: number;
  api: IModuleFrameAPI;
}

interface IModuleFrameInputSelect {
  type: "INPUT_SELECT";
  values: string[];
  default: number;
}

export default ({ frameUrl }: IModuleFrame) => {
  const iframe = useRef<any>();

  return (
    <>
      <iframe className="module-frame-iframe" ref={iframe} src={frameUrl} />
    </>
  );
};
