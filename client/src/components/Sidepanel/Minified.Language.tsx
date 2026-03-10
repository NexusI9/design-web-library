import "./index.scss";
import ChevronDownIcon from "@icons/chevron-down.svg";
import { Icon } from "@components/Icon";
import { Button } from "@components/Button";
import { locationUpdateLang } from "@lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import { Expandable } from "@components/Expandable";
import { LocaleContext } from "@components/Locale/Context";
import { TValidLang } from "@components/Locale/types";

export const Language = () => {
	const navigate = useNavigate()
	const { activeLocale, setActiveLocale, localesList } = useContext(LocaleContext);

	return (
		<Expandable.Wrapper>
			<div className="flex f-col gap-xl padding-h-l">
				<Expandable.Trigger>
					<Button style="GHOST" className="f-between full-width">
						{localesList.locales.find(({ value }) => value == activeLocale)?.label || localesList.default.label}
						<Icon size="SMALL" icon={ChevronDownIcon} />
					</Button>
				</Expandable.Trigger>
				<Expandable.Section className="flex f-col f-start gap-m" type="HEIGHT">
					{localesList.locales.map(({ label, value }) => (
						<Button
							key={`switchlang${value}`}
							style="GHOST"
							onClick={() => {
								// update URL
								navigate({ to: locationUpdateLang(value as TValidLang), replace: true });
								// update app State
								setActiveLocale(value);
							}}
						>
							{label}
						</Button>
					))}
				</Expandable.Section>
			</div>
		</Expandable.Wrapper>
	);
};
