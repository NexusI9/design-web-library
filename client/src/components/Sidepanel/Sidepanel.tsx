import "./Sidepanel.scss";
import Logo from "@assets/logo/akacia.svg";
import SidepanelItem, { ISidepanelItem } from "./SidepanelItem";
import { ComboBox } from "@components/ComboBox";
import ChevronDownIcon from "@icons/chevron-down.svg";
import { Icon } from "@components/Icon";
import { Button } from "@components/Button";

export interface ISidepanel {
  items: ISidepanelItem[];
}

export default ({ items }: ISidepanel) => {
  return (
    <nav className="sidepanel panel bd-radius-m flex f-col gap-xl padding-h-s padding-top-m">
      <header className="padding-h-xl padding-v-xl">
        <div className="padding-h-xl flex f-row f-end">
          <ComboBox.Trigger id="sidepanel_lang">
            <Button style="GHOST">
              EN
              <Icon size="SMALL" icon={ChevronDownIcon} />
            </Button>
          </ComboBox.Trigger>
          <ComboBox.Content id="sidepanel_lang" className="flex f-col gap-m">
            <Button style="GHOST">EN</Button>
            <Button style="GHOST">ZH</Button>
          </ComboBox.Content>
        </div>

        <div className="flex f-row f-end-h gap-l">
          <Logo />
          <p>Web Library</p>
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
