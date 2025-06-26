import { ReactNode, useContext } from "react";
import { ExpandableContext } from "./Wrapper";
import "./index.scss";

export interface IExpandableSection {
  children: ReactNode;
}

export default ({ children }: IExpandableSection) => {
  const { open } = useContext(ExpandableContext);

  return (
    <div className="expandable-section" data-open={open}>
      {children}
    </div>
  );
};
