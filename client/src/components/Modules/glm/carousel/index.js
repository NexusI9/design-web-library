import Scene from "./scene";

export function moduleInit() {
  document
    .querySelectorAll(".glm-carousel-wrapper")
    .forEach((container) => new Scene(container).init());
}

window.onload = moduleInit;
