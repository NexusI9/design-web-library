import { ReactNode, useContext, useRef, useEffect } from "react";
import { ExpandableContext } from "./Wrapper";
import "./index.scss";

export interface IExpandableSection {
  children: ReactNode;
  type: "HEIGHT" | "OPACITY";
}

export default ({ children, type }: IExpandableSection) => {
  const { open, setOpen } = useContext(ExpandableContext);
  const section = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseDown: EventListener = (e) => {
      if (
        section.current &&
        !section.current.contains(e.target as HTMLDivElement)
      ) {
        // close combobox on backdrop click
        setOpen(false);
      }
    };

    document.addEventListener("mouseup", handleMouseDown);

    return () => document.removeEventListener("mouseup", handleMouseDown);
  }, []);

  return (
    <div
      ref={section}
      className="expandable-section"
      data-open={open}
      data-type={type}
    >
      {children}
    </div>
  );
};
