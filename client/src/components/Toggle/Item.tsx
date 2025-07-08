import { ReactNode, useContext } from "react";
import "./index.scss";
import { IToggleContext, ToggleContext } from "./Root";

export interface IToggleItem {
  index: number;
  children: ReactNode;
  onClick?: Function;
  className?: string;
  size: 1 | 2;
}

export default ({ index, children, onClick, size, className }: IToggleItem) => {
  const { active, setActive } = useContext<IToggleContext>(ToggleContext);

  return (
    <div
      className={`toggle-item ${className || ""}`} 
      data-active={active === index}
      data-size={size}
      onClick={(e) => {
        setActive(index);
        onClick && onClick(e);
      }}
    >
      {children}
    </div>
  );
};
