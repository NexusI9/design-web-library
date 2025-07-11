import "./index.scss";
import { Desktop } from "./Desktop";
import { ISidepanelItem } from "./Item";
import { Minified } from "./Minified";

export interface ISidepanel {
  items: ISidepanelItem[];
}

export const Root = ({ items }: ISidepanel) => {
  return (
    <>
      <Desktop items={items} /> <Minified items={items} />
    </>
  );
};
