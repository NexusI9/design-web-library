import "./index.scss";
import PageHeader, { IPageHeader } from "@components/PageHeader/PageHeader";
import { ModuleInput } from "@components/ModuleInput";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@components/Button";

import { Icon } from "@components/Icon";
import { IButton } from "@components/Button/Button";
import { IIcon } from "@components/Icon/Icon";
import { downloadModule } from "@lib/utils";
import { TModuleSectionInputs } from "@components/ModuleInput/types";
import { Expandable } from "@components/Expandable";

import LinkIcon from "@icons/link.svg";
import FigmaIcon from "@icons/figma.svg";
import DownloadIcon from "@icons/download.svg";
import EditIcon from "@icons/settings.svg";

export interface IEmbedModuleIframe {
	name: string;
	url: string;
	inputs: TModuleSectionInputs;
	mockup?: string;
	frame?: HTMLIFrameElement | null;
}

export interface IEmbedModule extends IPageHeader {
	frames: IEmbedModuleIframe[];
}

type TEmbedModuleActions = IButton & IIcon;

export default ({ frames, title, subtitle }: IEmbedModule) => {
	const searchParams = useSearch({ strict: false });

	// update iframe params on search param changes
	const frameUrlParam = (url: string, param: Record<string, string>) => {
		return `${process.env.SERVER_URL}${url}?${new URLSearchParams(param).toString()}`;
	};

	return (
		<div className="flex f-col gap-3xl">
			<PageHeader title={title} subtitle={subtitle} />

			<div className="embed-module-frames-container">
				{frames.map((frame, i) => (
					<div
						id={frame.name}
						className="embed-module-wrapper flex f-col gap-xl"
						key={`${frame.url}${i}`}
					>
						<Expandable.Wrapper>
							<div className="embed-module-header gap-xl flex f-wrap f-row f-between f-center">

								<h5
									onClick={() => navigator.clipboard?.writeText(`${window.location.href}#${frame.name}`)}
									className="embed-module-header-title"
								>
									<Icon icon={LinkIcon} size="MEDIUM" />{frame.name}
								</h5>

								<div className="embed-module-header-buttons flex f-row gap-3xl f-center">
									<div className="embed-module-settings flex f-col gap-xs">
										<Expandable.Trigger>
											{!!frame.inputs.length && <Button style="GHOST" size="SMALL">
												<Icon icon={EditIcon} size="SMALL" />
												Settings
											</Button>
											}
										</Expandable.Trigger>
										<Expandable.Section type="OPACITY">
											<ModuleInput.Section
												className="panel shadow-medium"
												inputs={frame.inputs}
											/>
										</Expandable.Section>
									</div>

									<div className="flex f-row gap-xl f-center">
									  {frame.mockup && <a  href={frame.mockup} target="_blank"><Button style="OUTLINE" size="SMALL">
											<Icon icon={FigmaIcon} size="SMALL" />
											See mockup
										</Button></a>}
										<Button
											style="SOLID"
											onClick={() => downloadModule(frame.url, searchParams)}
											size="SMALL"
										>
											<Icon icon={DownloadIcon} size="SMALL" />
											Download code
										</Button>

									</div>
								</div>
							</div>

							<div className="embed-module-frame">
								<iframe
									className="embed-module-iframe"
									src={frameUrlParam(frame.url, searchParams)}
								/>
							</div>
						</Expandable.Wrapper>
					</div >
				))
				}
			</div>
		</div >
	);
};
