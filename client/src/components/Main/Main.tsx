import { ComboBox } from "@components/ComboBox";
import { ReactNode } from "react";

export interface IMain {
  children: ReactNode;
}

export default ({ children }: IMain) => (
    <ComboBox.Wrapper>{children}</ComboBox.Wrapper>
);
