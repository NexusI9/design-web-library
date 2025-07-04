import { ReactNode, useContext } from "react";
import { ComboBoxContext, IComboBoxState } from "./Wrapper";
import { createPortal } from "react-dom";

export interface IComboBoxContent {
  children: ReactNode;
  id: IComboBoxState["id"];
  className?: string;
}

export default ({ children, id, className }: IComboBoxContent) => {
  const { comboBoxContent } = useContext(ComboBoxContext);

  console.log(comboBoxContent);

  if (comboBoxContent.id !== id || comboBoxContent.target == undefined)
    return null;

  return createPortal(
    <div
      className={`combobox-content panel ${className || ''}`}
      style={{
        transform: `translate3d(${comboBoxContent.target.getBoundingClientRect().left}px, ${comboBoxContent.target.getBoundingClientRect().bottom}px, 0px)`,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};
