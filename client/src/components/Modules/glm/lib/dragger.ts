import { animate } from "popmotion";
import * as THREE from "three";
import { ICustomTouch } from "../types/Events";
import { clamp, touchMovement } from "./utils";

export interface IRotateObject {
  damping: number;
  inverted: boolean;
  axis: "x" | "y" | "z";
}

export default class Dragger {
  state: "dragged" | "released" = "released";
  container: HTMLElement | undefined;
  objectYRot: number = 0;
  mouseMouveTimeout: NodeJS.Timeout = setTimeout(() => false, 0);
  lastMouseMovement: number = 0;
  damping: number = 0.02;
  inverted: boolean = false;
  axis: "x" | "y" | "z" = "x";
  mesh: THREE.Mesh | THREE.Group | undefined;

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
    this.container?.setAttribute("data-cursor", "grab");

    clearTimeout(this.mouseMouveTimeout);
    const movementX =
      (this.inverted ? 1 : -1) *
      ((event as MouseEvent).movementX ||
        (touchMovement(event as TouchEvent, 20) as ICustomTouch).movementX ||
        0);

    this.lastMouseMovement = movementX;

    // Calculate rotation angles based on mouse movement
    const rotationY = movementX * this.damping;
    this.objectYRot = clamp(-3, 3)(rotationY);

    console.log(movementX);

    animate({
      from: this.mesh?.rotation[this.axis],
      to: this.mesh.rotation[this.axis] + this.objectYRot,
      onUpdate: (v) => {
        if (this.mesh) this.mesh.rotation[this.axis] = v;
      },
      type: "spring",
      duration: 600,
      damping: 30,
    });

    //reset to default speed if no more movement
    this.mouseMouveTimeout = setTimeout(() => {
      if (this.lastMouseMovement === movementX) {
        this.objectYRot = 0;
        this.lastMouseMovement = 0;
      }
    }, 1000);
  }

  init() {
    // drag event
    this.container?.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", this.boundRotate);
      this.state = "dragged";
    });

    // release event
    this.container?.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.boundRotate);
      this.container?.setAttribute("data-cursor", "default");
      this.state = "released";
    });

    //touch events for mobiles
    //this.renderer.domElement.addEventListener("touchmove", bindedMouseMove);
  }
}
