import Scene from "./scene.ts";

export function moduleInit() {
  document.querySelectorAll(".glm-slideshow").forEach((container) =>
    // instantiante new ones
    new Scene(container).init()
  );
}

window.onload = moduleInit;
