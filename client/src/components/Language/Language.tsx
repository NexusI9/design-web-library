import { locationLang } from "@lib/utils";
import { createContext, ReactNode, useState } from "react";

export type TValidLang = "en" | "zh-TW";

export const validLang: TValidLang[] = ["en", "zh-TW"];

export interface ILangContext {
  lang: TValidLang;
  setLang: Function;
}

export const LANG_FALLBACK = 'en';

export const LangContext = createContext<ILangContext>({
  lang: "en",
  setLang: () => 0,
});

interface ILanguage {
  children: ReactNode;
}

export default ({ children }: ILanguage) => {
  const [lang, setLang] = useState((locationLang() as TValidLang) || LANG_FALLBACK);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
