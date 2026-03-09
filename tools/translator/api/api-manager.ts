import { METHOD } from "../constants";


export class APIManager {

	async call(strings: string[], locale: string): Promise<string[]> {
		if (METHOD === "GEMINI") {
			const prompt = `
Translate the following UI strings from English to ${locale}.
Return ONLY a JSON array in the same order.

${JSON.stringify(strings)}
`;

			// TODO: replace with real API call
			console.log("Calling Gemini...");
			return strings.map((s) => `[${locale}] ${s}`);
		}

		if (METHOD === "GOOGLE_TRANSLATE") {
			// TODO: replace with real API call
			console.log("Calling Google Translate...");
			return strings.map((s) => `[${locale}] ${s}`);
		}

		return strings;
	}

}

