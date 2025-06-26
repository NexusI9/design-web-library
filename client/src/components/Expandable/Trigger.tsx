import { ReactNode, useContext, useState } from "react";
import { ExpandableContext } from "./Wrapper";

export interface IExpandableTrigger {
  children: ReactNode;
  onTrigger?: Function;
}

export default ({ children, onTrigger }: IExpandableTrigger) => {
  const { open, setOpen } = useContext(ExpandableContext);

  return (
    <div
      className="expandable-trigger"
      onClick={() => {
        const newState = !open;
        setOpen(newState); // update context callback
        if (onTrigger) onTrigger(newState); // external callback (optional)
      }}
    >
      {children}
    </div>
  );
};
