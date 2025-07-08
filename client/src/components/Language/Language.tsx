import { createContext, ReactNode } from "react";
import { Outlet, useParams } from "@tanstack/react-router";

export type TValidLang = "en" | "zh-tw";

export const validLang: TValidLang[] = ["en", "zh-tw"];

export const LangContext = createContext<TValidLang>("en");

interface ILanguage {
  children: ReactNode;
}

export default ({ children }: ILanguage) => {
  const { lang } = useParams({ strict: false });

  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
};
