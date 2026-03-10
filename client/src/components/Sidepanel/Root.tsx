import "./index.scss";
import { Desktop } from "./Desktop";
import { ISidepanelItem } from "./Item";
import { Minified } from "./Minified";
import { useContext, useEffect, useState } from "react";
import { LocaleContext } from "@components/Locale/Context";

export interface ISidepanel{
  items: ISidepanelItem[];
}


export const Root = () => {
  const [items, setItems] = useState<ISidepanelItem[]>([]);
  const { activeLocale } = useContext(LocaleContext);

  useEffect(() => {
    // fetch main route
    fetch(`${process.env.API_URL}/${activeLocale}/routes/page/resource`)
      .then((r) => r.json())
      .then(setItems);
  }, [activeLocale]);

  return (
    <>
      <Desktop items={items} /> <Minified items={items} />
    </>
  );
};
