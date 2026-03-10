export type TValidLang = "en-US" | "zh-TW";

export  interface ILocaleItem { label: string; value: string; };

export interface ILocalesList {
	locales: Array<ILocaleItem>;
	default: ILocaleItem;
}
