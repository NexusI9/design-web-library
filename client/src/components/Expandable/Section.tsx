import { ReactNode, useContext } from "react";
import { ExpandableContext } from "./Wrapper";
import "./index.scss";

export interface IExpandableSection {
  children: ReactNode;
  type: "HEIGHT" | "OPACITY";
}

export default ({ children, type }: IExpandableSection) => {
  const { open } = useContext(ExpandableContext);

  return (
    <div className="expandable-section" data-open={open} data-type={type}>
      {children}
    </div>
  );
};
