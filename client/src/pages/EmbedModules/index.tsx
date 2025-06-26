import {
  ButtonHTMLAttributes,
  LegacyRef,
  useCallback,
  useRef,
  useState,
} from "react";
import "./index.scss";
import PageHeader, { IPageHeader } from "@components/PageHeader/PageHeader";
import { ModuleSectionInputs } from "@components/ModuleInput/ModuleInputSection";
import { ModuleInput } from "@components/ModuleInput";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@components/Button";

import LinkIcon from "@icons/link.svg";
import DownloadIcon from "@icons/download.svg";
import { Icon } from "@components/Icon";
import { IButton } from "@components/Button/Button";
import { IIcon } from "@components/Icon/Icon";
import { downloadZIP } from "@lib/utils";

interface IEmbedModuleIframe {
  module: string;
  frame?: HTMLIFrameElement | null;
  url: string;
  inputs: ModuleSectionInputs;
  channel: string;
}

export interface IEmbedModule extends IPageHeader {
  frames: IEmbedModuleIframe[];
}

type TEmbedModuleActions = IButton & IIcon;

export default ({ frames, title, subtitle }: IEmbedModule) => {
  const [framesSection, setFramesSection] = useState(frames);

  const searchParams = useSearch({ from: location.pathname });

  const buttonsArray: (module: string) => TEmbedModuleActions[] = (
    module: string,
  ) => [
    {
      icon: LinkIcon,
      size: "SMALL",
      children: <>Copy link</>,
      style: "OUTLINE",
      onClick: () => navigator.clipboard.writeText(window.location.href),
    },
    {
      icon: DownloadIcon,
      size: "SMALL",
      children: <>Download module</>,
      style: "SOLID",
      onClick: () => downloadZIP(module, searchParams),
    },
  ];

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
          className="embed-module-wrapper flex f-col gap-2xl"
          key={`${frame.url}${i}`}
        >
          {frame.frame && (
            <div className="embed-module-header gap-4xl flex f-row f-end f-between">
              <ModuleInput.Section
                frame={frame.frame}
                inputs={frame.inputs}
                channel={frame.channel}
              />
              <div className="embed-module-header-buttons flex f-row gap-xl">
                {buttonsArray(frame.module).map((button,i) => (
                  <Button key={`${frame.module}button${i}`} style={button.style} onClick={button.onClick}>
                    <Icon icon={button.icon} size={button.size} />
                    {button.children}
                  </Button>
                ))}
              </div>
            </div>
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
