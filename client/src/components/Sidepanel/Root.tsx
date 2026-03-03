import "./index.scss";
import { Desktop } from "./Desktop";
import { ISidepanelItem } from "./Item";
import { Minified } from "./Minified";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "@components/Language/Language";

export interface ISidepanel{
  items: ISidepanelItem[];
}


export const Root = () => {
  const [items, setItems] = useState<ISidepanelItem[]>([]);
  const { lang } = useContext(LangContext);

  useEffect(() => {
    // fetch main route
    fetch(`${process.env.API_URL}/${lang}/routes/page/resource`)
      .then((r) => r.json())
      .then(setItems);
  }, [lang]);

  return (
    <>
      <Desktop items={items} /> <Minified items={items} />
    </>
  );
};
