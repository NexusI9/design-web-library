import "./index.scss";
import { ComboBox } from "@components/ComboBox";
import ChevronDownIcon from "@icons/chevron-down.svg";
import { Icon } from "@components/Icon";
import { Button } from "@components/Button";
import { locationUpdateLang } from "@lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import { LocaleContext } from "@components/Locale/Context";
import { TValidLang } from "@components/Locale/types";

export const Language = () => {
	const navigate = useNavigate();
	const { activeLocale, setActiveLocale, localesList } = useContext(LocaleContext);

	return (
		<>
			<ComboBox.Trigger id="sidepanel_lang">
				<Button style="GHOST">
					{localesList.locales.find(({ value }) => value == activeLocale)?.label || localesList.default.label}
					<Icon size="SMALL" icon={ChevronDownIcon} />
				</Button>
			</ComboBox.Trigger>
			<ComboBox.Content id="sidepanel_lang" className="flex f-col gap-l">
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
			</ComboBox.Content>
		</>
	);
};
