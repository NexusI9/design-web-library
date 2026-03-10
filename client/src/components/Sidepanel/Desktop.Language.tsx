import "./index.scss";
import { ComboBox } from "@components/ComboBox";
import ChevronDownIcon from "@icons/chevron-down.svg";
import { Icon } from "@components/Icon";
import { Button } from "@components/Button";
import { locationUpdateLang } from "@lib/utils";
import { LangContext, TValidLang } from "@components/Language/Language";
import { useNavigate } from "@tanstack/react-router";
import { useContext } from "react";

const langMap: { lang: TValidLang; label: string }[] = [
  {
    label: "EN",
    lang: "en",
  },
  {
    label: "中文",
    lang: "zh-TW",
  },
];

export const Language = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useContext(LangContext);

  return (
    <>
      <ComboBox.Trigger id="sidepanel_lang">
        <Button style="GHOST">
          {langMap.find((item) => item.lang == lang)?.label || "english"}
          <Icon size="SMALL" icon={ChevronDownIcon} />
        </Button>
      </ComboBox.Trigger>
      <ComboBox.Content id="sidepanel_lang" className="flex f-col gap-l">
        {langMap.map(({ label, lang }) => (
          <Button
            key={`switchlang${lang}`}
            style="GHOST"
            onClick={() => {
              // update URL
              navigate({ to: locationUpdateLang(lang), replace: true });
              // update app State
              setLang(lang);
            }}
          >
            {label}
          </Button>
        ))}
      </ComboBox.Content>
    </>
  );
};
