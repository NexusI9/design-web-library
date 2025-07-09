import "./Icon.scss";
import { createElement, useEffect, useRef, useState } from "react";

export interface IIcon {
  rawSVG?: string;
  icon?: string;
  size: "SMALL" | "MEDIUM" | "LARGE";
}

export default ({ rawSVG, icon, size }: IIcon) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (ref.current && rawSVG) ref.current.innerHTML = rawSVG;
  }, [rawSVG]);

  return (
    <>
      {rawSVG && <span ref={ref} />}
      {icon &&
        createElement(icon, {
          className: "icon",
          "data-size": size,
        })}
    </>
  );
};
