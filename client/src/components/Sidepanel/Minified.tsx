import "./index.scss";
import Logo from "@assets/logo/akacia.svg";
import { Item } from "./Item";
import { ISidepanel } from "./Root";
import { LangContext } from "@components/Language/Language";
import { useContext, useEffect, useState } from "react";
import { Language } from "./Minified.Language";
import { useRouter } from "@tanstack/react-router";
import { Divider } from "@components/Divider";

export const Minified = ({ items }: ISidepanel) => {
  const [open, setOpen] = useState(false);
  const { lang } = useContext(LangContext);
  const router = useRouter();

  useEffect(() => {
    // close menu on locaiton change
    const unsubscribe = router.subscribe("onBeforeNavigate", () => {
      setOpen(false);
    });

    return unsubscribe;
  }, [router]);

  return (
    <nav
      className="sidepanel sidepanel-minified full-width flex f-col gap-xl padding-h-s padding-top-m"
      data-open={open}
    >
      <header className="flex f-row f-between f-center padding-h-2xl padding-v-xl">
        <div className="flex f-row f-end-h gap-l">
          <Logo />
          <p>{lang == "en" ? "Web Library" : "網站資源庫"}</p>
        </div>

        <div
          className="sidepanel-minified-button flex f-col f-center"
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <div className="sidepanel-minified-content panel padding-h-xl flex f-col gap-3xl">
        <ul className="flex f-col gap-s">
          {items.map((item) => (
            <Item {...item} key={`sidepanelitem${item.path}`} />
          ))}
        </ul>
        <Divider />
        <Language />
      </div>
    </nav>
  );
};
