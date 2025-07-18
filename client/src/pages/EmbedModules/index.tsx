import "./index.scss";
import PageHeader, { IPageHeader } from "@components/PageHeader/PageHeader";
import { ModuleInput } from "@components/ModuleInput";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@components/Button";

import { Icon } from "@components/Icon";
import { IButton } from "@components/Button/Button";
import { IIcon } from "@components/Icon/Icon";
import { downloadZIP } from "@lib/utils";
import { TModuleSectionInputs } from "@components/ModuleInput/types";
import { Expandable } from "@components/Expandable";

import LinkIcon from "@icons/link.svg";
import DownloadIcon from "@icons/download.svg";
import EditIcon from "@icons/settings.svg";

export interface IEmbedModuleIframe {
  module: string;
  frame?: HTMLIFrameElement | null;
  url: string;
  inputs: TModuleSectionInputs;
}

export interface IEmbedModule extends IPageHeader {
  frames: IEmbedModuleIframe[];
}

type TEmbedModuleActions = IButton & IIcon;

export default ({ frames, title, subtitle }: IEmbedModule) => {
  const searchParams = useSearch({ strict: false });

  const buttonsArray: (module: string) => TEmbedModuleActions[] = (
    module: string,
  ) => [
    {
      icon: LinkIcon,
      size: "SMALL",
      children: <>Copy link</>,
      style: "OUTLINE",
      onClick: () => navigator.clipboard?.writeText(window.location.href),
    },
    {
      icon: DownloadIcon,
      size: "SMALL",
      children: <>Download code</>,
      style: "SOLID",
      onClick: () => downloadZIP(module, searchParams),
    },
  ];

  // update iframe params on search param changes
  const frameUrlParam = (url: string, param: Record<string, string>) => {
    return `${url}?${new URLSearchParams(param).toString()}`;
  };

  return (
    <div className="flex f-col gap-3xl">
      <PageHeader title={title} subtitle={subtitle} />
      {frames.map((frame, i) => (
        <div
          className="embed-module-wrapper flex f-col gap-xl"
          key={`${frame.url}${i}`}
        >
          <Expandable.Wrapper>
            <div className="embed-module-header gap-xl flex f-wrap f-row f-between f-center">
              <div className="embed-module-settings flex f-col gap-xs">
                <Expandable.Trigger>
                  <Button style="GHOST">
                    <Icon icon={EditIcon} size="SMALL" />
                    Settings
                  </Button>
                </Expandable.Trigger>
                <Expandable.Section type="OPACITY">
                  <ModuleInput.Section
                    className="panel shadow-medium"
                    inputs={frame.inputs}
                  />
                </Expandable.Section>
              </div>
              <div className="embed-module-header-buttons flex f-row gap-xl">
                {buttonsArray(frame.module).map((button, i) => (
                  <Button
                    key={`${frame.module}button${i}`}
                    style={button.style}
                    onClick={button.onClick}
                  >
                    <Icon icon={button.icon} size={button.size} />
                    {button.children}
                  </Button>
                ))}
              </div>
            </div>

            <div className="embed-module-frame">
              <iframe
                className="embed-module-iframe"
                src={frameUrlParam(frame.url, searchParams)}
              />
            </div>
          </Expandable.Wrapper>
        </div>
      ))}
    </div>
  );
};
