import { Icon } from "@components/Icon";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export interface ISidepanelItem {
  icon: string;
  label: string;
  path: string;
}

export const Item = ({ icon, label, path }: ISidepanelItem) => {
  const [active, setActive] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    // get parameter from url
    const { pathname } = location;
    pathname.split("/")[1];
    setActive(path == pathname);
    
    console.log({path, label, pathname});
    
  }, [location]);

  return (
    <li className="sidepanel-item cursor-default bd-radius-m" data-active={active}>
      <Link
        to={`$lang/${path}`}
        className="flex f-row f-center-h gap-m  padding-l"
      >
        {icon && <Icon size="MEDIUM" rawSVG={icon} />}
        {label}
      </Link>
    </li>
  );
};
