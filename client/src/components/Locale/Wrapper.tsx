import { cFetch, locationLang } from "@lib/utils";
import { ReactNode, useEffect, useState } from "react";
import { ILocalesList, TValidLang } from "./types";
import { LocaleContext } from "./Context";
import { LOCALE_DEFAULT } from "./constants";


interface ILocaleWrapper {
	children: ReactNode;
}


export default ({ children }: ILocaleWrapper) => {

	const [activeLocale, setActiveLocale] = useState((locationLang() as TValidLang) || LOCALE_DEFAULT);
	const [localesList, setLocalesList] = useState<ILocalesList>({ locales: [], default: { label: "Loading", value: LOCALE_DEFAULT } });

	useEffect(() => {
	  cFetch(`${process.env.API_URL}/locales`).then(e => setLocalesList(e));
	}, []);

	return (
		<LocaleContext.Provider value={{ activeLocale, setActiveLocale, localesList }}>
			{children}
		</LocaleContext.Provider>
	);
};
