import "./index.scss";

import {
  createContext,
  ReactNode,
  SetStateAction,
  useState,
  Dispatch,
} from "react";

export interface IComboBoxWrapper {
  children: ReactNode;
}

export interface IComboBoxState {
  id: string | undefined;
  target: HTMLElement | undefined;
}

export interface IComboBoxContext {
  comboBoxContent: IComboBoxState;
  setComboBoxContent: Dispatch<SetStateAction<IComboBoxState>>;
}
export const ComboBoxContext = createContext<IComboBoxContext>({
  comboBoxContent: { id: "", target: undefined },
  setComboBoxContent: () => ({ id: "", target: undefined }),
});

export default ({ children }: IComboBoxWrapper) => {
  const [comboBoxContent, setComboBoxContent] = useState<IComboBoxState>({
    id: undefined,
    target: undefined,
  });

  return (
    <ComboBoxContext.Provider value={{ comboBoxContent, setComboBoxContent }}>
      {children}
    </ComboBoxContext.Provider>
  );
};
