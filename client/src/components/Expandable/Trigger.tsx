import { ReactNode, useContext, useState } from "react";
import { ExpandableContext } from "./Wrapper";

export interface IExpandableTrigger {
  children: ReactNode;
  onTrigger?: Function;
}

export default ({ children, onTrigger }: IExpandableTrigger) => {
  const { setOpen } = useContext(ExpandableContext);

  return (
    <div
      className="expandable-trigger"
      onClick={() => {
        setOpen((current) => {
	  console.log(current);
          const newState = !current;
          if (onTrigger) onTrigger(newState); // external callback (optional)
          return newState; // update context callback
        });
      }}
    >
      {children}
    </div>
  );
};
