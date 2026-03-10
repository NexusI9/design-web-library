import { locationLang } from "@lib/utils";
import { createContext, ReactNode, useState } from "react";

export type TValidLang = "en-US" | "zh-TW";

export const validLang: TValidLang[] = ["en-US", "zh-TW"];

export interface ILangContext {
	lang: TValidLang;
	setLang: Function;
}

export const LANG_FALLBACK: TValidLang = 'en-US';

export const LangContext = createContext<ILangContext>({
	lang: "en-US",
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
