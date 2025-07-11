import "./index.scss";
import ChevronDownIcon from "@icons/chevron-down.svg";
import { Icon } from "@components/Icon";
import { Button } from "@components/Button";
import { locationUpdateLang } from "@lib/utils";
import { LangContext, TValidLang } from "@components/Language/Language";
import { useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import { Expandable } from "@components/Expandable";

const langMap: { lang: TValidLang; label: string }[] = [
  {
    label: "En",
    lang: "en",
  },
  {
    label: "中文",
    lang: "zh-tw",
  },
];

export const Language = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useContext(LangContext);

  return (
    <Expandable.Wrapper>
      <div className="flex f-col gap-xl padding-h-l">
        <Expandable.Trigger>
          <Button style="GHOST" className="f-between full-width">
            {langMap.find((item) => item.lang == lang)?.label || "english"}
            <Icon size="SMALL" icon={ChevronDownIcon} />
          </Button>
        </Expandable.Trigger>
        <Expandable.Section className="flex f-col f-start gap-m" type="HEIGHT">
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
        </Expandable.Section>
	  </div>
      </Expandable.Wrapper>
  );
};
