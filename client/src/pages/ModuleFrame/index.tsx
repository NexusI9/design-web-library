import { Fragment, useRef } from "react";
import "./index.scss";
import PageHeader, { IPageHeader } from "@components/PageHeader/PageHeader";
import { ModuleSectionInputs } from "@components/ModuleInput/ModuleInputSection";
import { ModuleInput } from "@components/ModuleInput";

interface IEmbedModuleIframe {
  url: string;
  inputs: ModuleSectionInputs;
}

export interface IEmbedModule extends IPageHeader {
  frames: IEmbedModuleIframe[];
}

export default ({ frames, title, subtitle }: IEmbedModule) => {
  const iframe = useRef<any>();

  return (
    <div className="flex f-col gap-3xl">
      <PageHeader title={title} subtitle={subtitle} />
      {frames.map((frame, i) => (
        <div className="embed-module-frame flex f-col gap-2xl" key={`${frame.url}${i}`}>
          <ModuleInput.Section inputs={frame.inputs} />
          <iframe
            className="module-frame-iframe"
            ref={iframe}
            src={frame.url}
          />
        </div>
      ))}
    </div>
  );
};
