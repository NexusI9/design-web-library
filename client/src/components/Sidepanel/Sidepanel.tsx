import "./Sidepanel.scss";
import Logo from "@assets/logo/akacia.svg";
import SidepanelItem, { ISidepanelItem } from "./SidepanelItem";
import { ComboBox } from "@components/ComboBox";
import ChevronDownIcon from "@icons/chevron-down.svg";
import { Icon } from "@components/Icon";
import { Button } from "@components/Button";
import { locationUpdateLang } from "@lib/utils";
import { LangContext, TValidLang } from "@components/Language/Language";
import { useNavigate } from "@tanstack/react-router";
import { useContext } from "react";

export interface ISidepanel {
  items: ISidepanelItem[];
}

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

export default ({ items }: ISidepanel) => {
  const navigate = useNavigate();
  const { lang, setLang } = useContext(LangContext);
  
  return (
    <nav className="sidepanel panel bd-radius-m flex f-col gap-xl padding-h-s padding-top-m">
      <header className="padding-h-xl padding-v-xl">
        <div className="padding-h-xl flex f-row f-end">
          <ComboBox.Trigger id="sidepanel_lang">
            <Button style="GHOST">
              {langMap.find((item) => item.lang == lang)?.label ||
                "english"}
              <Icon size="SMALL" icon={ChevronDownIcon} />
            </Button>
          </ComboBox.Trigger> 
          <ComboBox.Content id="sidepanel_lang" className="flex f-col gap-m">
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
        </div>

        <div className="flex f-row f-end-h gap-l">
          <Logo />
          <p>{lang == "en" ? "Web Library" : "網站資源庫"}</p>
        </div>
      </header>
      <ul className="flex f-col gap-s padding-h-xl">
        {items.map((item) => (
          <SidepanelItem {...item} key={`sidepanelitem${item.path}`} />
        ))}
      </ul>
    </nav>
  );
};
