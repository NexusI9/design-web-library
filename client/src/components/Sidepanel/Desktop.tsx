import "./index.scss";
import Logo from "@assets/logo/akacia.svg";
import { Item } from "./Item";
import { ISidepanel } from "./Root";
import { LangContext } from "@components/Language/Language";
import { useContext } from "react";
import { Language } from "./Desktop.Language";

export const Desktop = ({ items }: ISidepanel) => {
  const { lang } = useContext(LangContext);

  return (
    <nav className="sidepanel sidepanel-desktop panel bd-radius-m flex f-col gap-xl padding-h-s padding-top-m">
      <header className="padding-h-xl padding-v-xl">
        <div className="padding-h-xl flex f-row f-end">
          <Language />
        </div>
        <div className="flex f-row f-end-h gap-l">
          <Logo />
          <p>{lang == "en-US" ? "Web Library" : "網站資源庫"}</p>
        </div>
      </header>
      <ul className="flex f-col gap-s padding-h-xl">
        {items.map((item) => (
          <Item {...item} key={`sidepanelitem${item.path}`} />
        ))}
      </ul>
    </nav>
  );
};
