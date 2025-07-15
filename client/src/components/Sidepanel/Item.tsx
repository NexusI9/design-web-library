import { Icon } from "@components/Icon";
import { Link } from "@tanstack/react-router";

export interface ISidepanelItem {
  icon: string;
  label: string;
  path: string;
}

export const Item = ({ icon, label, path }: ISidepanelItem) => {
  return (
    <li className="sidepanel-item cursor-default bd-radius-m">
      <Link to={`$lang/${path}`} className="flex f-row f-center-h gap-m  padding-l">
        {icon && <Icon size="MEDIUM" rawSVG={icon} />}
        {label}
      </Link>
    </li>
  );
};
