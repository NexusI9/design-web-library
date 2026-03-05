import ThreePlanarScene from "../lib/three-planar-scene";
import { configFromDataSet } from "../lib/utils";
import { ISceneConfig } from "../types/Scene";

export default class extends ThreePlanarScene {
  config: ISceneConfig = {
    transitionType: "wave",
    transitionDuration: 200,
  };

  constructor(container: HTMLElement) {
    super(container);
    this.config = configFromDataSet(container, this.config);
  }

  init() {
    this.thumbnail = String(this.container.getAttribute("src"));
    super.init();
    this.drawPlane();
    this.orthographicCamera();
  }

  render() {
    if (!this.play) return;

    if (this.camera) this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}
