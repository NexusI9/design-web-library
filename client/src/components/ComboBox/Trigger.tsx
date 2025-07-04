import { BaseSyntheticEvent, ReactNode, useContext } from "react";
import { ComboBoxContext, IComboBoxContext, IComboBoxState } from "./Wrapper";

export interface IComboBoxTrigger {
  children: ReactNode;
  id: IComboBoxState["id"];
}

export default ({ children, id }: IComboBoxTrigger) => {
  const { setComboBoxContent } = useContext<IComboBoxContext>(ComboBoxContext);

  const handleOnClick = (e: BaseSyntheticEvent) => {
    const target = e.currentTarget;

    // 1. define combobox module id so if receiver matches, display content
    // 2. set the target so we know where to position the panel
    setComboBoxContent((current) => ({ ...current, id, target }));
  };

  return (
    <div className="combobox-trigger flex f-row gap-s" onClick={handleOnClick}>
      {children}
    </div>
  );
};
