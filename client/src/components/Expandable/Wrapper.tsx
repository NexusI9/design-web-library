import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface IExpandableContext{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ExpandableContext = createContext<IExpandableContext>({open: false, setOpen:() => {}});

export interface IExpandableWrapper {
  children: ReactNode;
}

export default ({ children }: IExpandableWrapper) => {
  const [open, setOpen] = useState(false);

  // pass the states as the context values so accessible by consumers
  return (
    <ExpandableContext.Provider value={{open, setOpen}}>
      {children}
    </ExpandableContext.Provider>
  );
};
