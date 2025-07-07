import { ComboBox } from "@components/ComboBox";
import Language from "@components/Language/Language";
import { ReactNode } from "react";

export interface IMain {
  children: ReactNode;
}

export default ({ children }: IMain) => (
  <Language>
    <ComboBox.Wrapper>{children}</ComboBox.Wrapper>
  </Language>
);
