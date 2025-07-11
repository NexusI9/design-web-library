import { ReactNode, useContext, useRef, useEffect } from "react";
import { ExpandableContext } from "./Wrapper";
import "./index.scss";

export interface IExpandableSection {
  children: ReactNode;
  type: "HEIGHT" | "OPACITY";
  className?: string;
}

export default ({ children, type, className }: IExpandableSection) => {
  const { open, setOpen } = useContext(ExpandableContext);
  const section = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const node = e.target as HTMLElement;

      // check if parent is section trigger
      let isTrigger = false;
      let currentNode = node;
      while (currentNode.parentElement) {
        if (currentNode.classList.contains("expandable-trigger")) {
          isTrigger = true;
          break;
        }
        currentNode = currentNode.parentElement;
      }

      if (
        section.current &&
        !section.current.contains(e.target as HTMLDivElement) &&
        !isTrigger
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
      className={`expandable-section ${className || ""}`}
      data-open={open}
      data-type={type}
    >
      {children}
    </div>
  );
};
