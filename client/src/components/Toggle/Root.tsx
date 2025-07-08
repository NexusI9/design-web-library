import {
  BaseSyntheticEvent,
  createContext,
  Dispatch,
  ReactNode,
  useState,
} from "react";
import "./index.scss";

interface IToggleRoot {
  children: ReactNode;
  className?: string;
}

export interface IToggleContext {
  active: number;
  setActive: Function;
}

export const ToggleContext = createContext<IToggleContext>({
  active: 0,
  setActive: () => 0,
});

export default ({ children, className }: IToggleRoot) => {
  const [active, setActive] = useState<number>(0);

  return (
    <ToggleContext.Provider value={{ active, setActive }}>
      <div className={`toggle-root ${className || ""}`}>{children}</div>
    </ToggleContext.Provider>
  );
};
