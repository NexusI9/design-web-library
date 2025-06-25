import { LegacyRef, useCallback, useRef, useState } from "react";
import "./index.scss";
import PageHeader, { IPageHeader } from "@components/PageHeader/PageHeader";
import { ModuleSectionInputs } from "@components/ModuleInput/ModuleInputSection";
import { ModuleInput } from "@components/ModuleInput";
import { useSearch } from "@tanstack/react-router";

interface IEmbedModuleIframe {
  frame?: HTMLIFrameElement | null;
  url: string;
  inputs: ModuleSectionInputs;
  channel: string;
}

export interface IEmbedModule extends IPageHeader {
  frames: IEmbedModuleIframe[];
}

export default ({ frames, title, subtitle }: IEmbedModule) => {
  const [framesSection, setFramesSection] = useState(frames);

  const searchParams = useSearch({ from: location.pathname });

  // update iframe params on search param changes
  const frameUrlParam = (url: string, param: Record<string, string>) =>
    `${url}?${new URLSearchParams(param).toString()}`;

  const updateFrame = useCallback(
    (frame: HTMLIFrameElement | null, index: number) => {
      setFramesSection((oldList) => {
        oldList[index].frame = frame;
        return [...oldList];
      });
    },
    [],
  );

  return (
    <div className="flex f-col gap-3xl">
      <PageHeader title={title} subtitle={subtitle} />
      {framesSection.map((frame, i) => (
        <div
          className="embed-module-frame flex f-col gap-2xl"
          key={`${frame.url}${i}`}
        >
          {frame.frame && (
            <ModuleInput.Section
              frame={frame.frame}
              inputs={frame.inputs}
              channel={frame.channel}
            />
          )}
          <iframe
            onLoad={(e) => updateFrame(e.currentTarget, i)}
            className="embed-module-iframe"
            src={frameUrlParam(frame.url, searchParams)}
          />
        </div>
      ))}
    </div>
  );
};
