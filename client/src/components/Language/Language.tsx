import { locationLang } from "@lib/utils";
import { createContext, ReactNode, useEffect, useState } from "react";

export type TValidLang = "en" | "zh-tw";

export const validLang: TValidLang[] = ["en", "zh-tw"];

export interface ILangContext {
  lang: TValidLang;
  setLang: Function;
}

export const LangContext = createContext<ILangContext>({
  lang: "en",
  setLang: () => 0,
});

interface ILanguage {
  children: ReactNode;
}

export default ({ children }: ILanguage) => {
  const [lang, setLang] = useState("en" as TValidLang);

  useEffect(() => {
    // define correct lang on page load
    setLang(locationLang() as TValidLang);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
