import { createRoot } from "react-dom/client";
import App from "./App";
import { Language } from "@components/Language";

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("app");
  const root = container && createRoot(container);
  root?.render(
    <Language>
      <App />
    </Language>,
  );
});
