import { createContext } from "react";
import { ILocalesList, TValidLang } from "./types";
import { LOCALE_DEFAULT } from "./constants";

export interface ILocaleContext {
	activeLocale: TValidLang;
	setActiveLocale: Function;
	localesList: ILocalesList;
}

export const LocaleContext = createContext<ILocaleContext>({
	activeLocale: LOCALE_DEFAULT,
	setActiveLocale: () => 0,
	localesList: { locales: [], default: { label: "Loading", value: LOCALE_DEFAULT } }
});
