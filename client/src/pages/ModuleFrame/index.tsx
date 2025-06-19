import { useRef } from "react";
import "./index.scss";
import PageHeader, { IPageHeader } from "@components/PageHeader/PageHeader";

interface IModuleFrameIFrame {
  url: string;
  inputs: (IModuleFrameInputNumber | IModuleFrameInputSelect)[];
}

export interface IModuleFrame extends IPageHeader {
  frames: IModuleFrameIFrame[];
}

interface IModuleFrameAPI {
  attribute: string;
  value: string | number;
}

interface IModuleFrameInputBase {
  targetAttribute: string;
  label: string;
}

interface IModuleFrameInputNumber extends IModuleFrameInputBase {
  type: "INPUT_NUMBER";
  min: number;
  max: number;
  default: number;
}

interface IModuleFrameInputSelect extends IModuleFrameInputBase {
  type: "INPUT_SELECT";
  values: { label: string; value: string }[];
  default: number;
}

export default ({ frames, title, subtitle }: IModuleFrame) => {
  const iframe = useRef<any>();

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      {frames.map((frame, i) => (
        <iframe
          key={`${frame.url}${i}`}
          className="module-frame-iframe"
          ref={iframe}
          src={frame.url}
        />
      ))}
    </>
  );
};
