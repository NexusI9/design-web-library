import { animate } from "popmotion";
import * as THREE from "three";
import { ICustomTouch } from "../types/Events";
import { clamp, touchMovement } from "./utils";



export default class Dragger {
  state: "moving" | "complete" | "slow" = "complete";
  container: HTMLElement | undefined;
  objectYRot: number = 0;
  mouseMouveTimeout: NodeJS.Timeout = setTimeout(() => false, 0);
  lastMouseMovement: number = 0;
  damping: number = 0.02;
  inverted: boolean = false;
  axis: "x" | "y" | "z" = "x";
  mesh: THREE.Mesh | THREE.Group | undefined;
  velocity: number = 0;

  boundRotate = this.rotate.bind(this);

  constructor({
    container,
    damping,
    inverted,
    axis,
    mesh,
  }: Pick<Dragger, "container" | "damping" | "inverted" | "axis" | "mesh">) {
    this.container = container;
    this.damping = damping;
    this.inverted = inverted;
    this.axis = axis;
    this.mesh = mesh;
  }

  get getState() {
    return this.state;
  }

  rotate(event: MouseEvent | TouchEvent) {
    if (!this.mesh) return;

    this.state = "moving";
    this.container?.setAttribute("data-cursor", "grab");

    clearTimeout(this.mouseMouveTimeout);
    const movementX =
      (this.inverted ? 1 : -1) *
      ((event as MouseEvent).movementX ||
        (touchMovement(event as TouchEvent, 20) as ICustomTouch).movementX ||
        0);

    this.lastMouseMovement = movementX;

    // pow easing
    const response = (x: number) => Math.sign(x) * Math.pow(Math.abs(x), 1.3);

    // Calculate rotation angles based on mouse movement
    const rotationY = response(movementX);
    this.objectYRot = clamp(-3, 3)(rotationY);

    //console.log(movementX);

    let last = 0;
    animate({
      from: this.mesh?.rotation[this.axis],
      to: this.mesh.rotation[this.axis] + this.objectYRot,
      onUpdate: (v) => {
        if (this.mesh) {
          this.mesh.rotation[this.axis] = v;

          if (Math.abs(this.mesh.rotation[this.axis] - last) < 0.001)
            this.state = "slow";

          last = this.mesh.rotation[this.axis];
        }
      },
      onComplete: () => {
        this.state = "complete";
      },
      type: "spring",
      duration: 5000,
      damping: 50,
      restDelta: 0.0005,
    });
  }

  init() {
    // drag event
    this.container?.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", this.boundRotate);
    });

    // release event
    this.container?.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.boundRotate);
      this.container?.setAttribute("data-cursor", "default");
    });

    //touch events for mobiles
    this.container?.addEventListener("touchmove", this.boundRotate);
  }
}
