import { ReactNode } from "react";
import "./Button.scss";

export interface IButton {
  children: ReactNode;
  style: "SOLID" | "OUTLINE";
}

export default ({ children, style }: IButton) => {
  return (
    <button className="button flex f-row f-center gap-l" data-style={style}>
      {children}
    </button>
  );
};
