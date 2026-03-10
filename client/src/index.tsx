import { createRoot } from "react-dom/client";
import App from "./App";
import { LocaleProvider } from "@components/Locale";

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("app");
	const root = container && createRoot(container);
	root?.render(
		<LocaleProvider>
			<App />
		</LocaleProvider>
	);
});
