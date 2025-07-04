import {
  BaseSyntheticEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ComboBoxContext, IComboBoxState } from "./Wrapper";
import { createPortal } from "react-dom";

export interface IComboBoxContent {
  children: ReactNode;
  id: IComboBoxState["id"];
  className?: string;
}

export default ({ children, id, className }: IComboBoxContent) => {
  const { comboBoxContent, setComboBoxContent } = useContext(ComboBoxContext);
  const panel = useRef<any>();

  useEffect(() => {
    const handleMouseDown: EventListener = (e) => {
      if (panel.current && !panel.current.contains(e.target)) {
        // close combobox on backdrop click
        setComboBoxContent((current) => ({
          ...current,
          id: undefined,
          target: undefined,
        }));
      }
    };

    document.addEventListener("mouseup", handleMouseDown);

    return () => document.removeEventListener("mouseup", handleMouseDown);
  }, []);

  if (comboBoxContent.id !== id || comboBoxContent.target == undefined)
    return null;

  return createPortal(
    <div
      className={`combobox-content panel ${className || ""}`}
      style={{
        transform: `translate3d(${comboBoxContent.target.getBoundingClientRect().left}px, ${comboBoxContent.target.getBoundingClientRect().bottom}px, 0px)`,
      }}
      ref={panel}
    >
      {children}
    </div>,
    document.body,
  );
};
