import { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.scss";

export interface IButton
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  children: ReactNode;
  style: "SOLID" | "OUTLINE" | "GHOST";
}

export default ({ children, style, onClick }: IButton) => {
  return (
    <button
      onClick={onClick}
      className="button flex flex-no-shrink f-row f-center gap-l"
      data-style={style}
    >
      {children}
    </button>
  );
};
