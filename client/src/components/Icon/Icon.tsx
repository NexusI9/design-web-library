import "./Icon.scss";
import { createElement } from "react";

export interface IIcon {
  icon: string;
  size: "SMALL" | "MEDIUM" | "LARGE";
}

export default ({ icon, size }: IIcon) => (
  <>
    {createElement(icon, {
      class: "icon",
      "data-size": size,
    })}n
  </>
);
