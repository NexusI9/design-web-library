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

  constructor({ container }: Pick<Dragger, "container">) {
    this.container = container;
  }

  get getState() {
    return this.state;
  }

  rotate(
    event: MouseEvent | TouchEvent,
    mesh: THREE.Mesh | THREE.Group,
    { damping = 0.02, inverted = false, axis = "y" }: IRotateObject,
  ) {
    this.container?.setAttribute("data-cursor", "grab");

    clearTimeout(this.mouseMouveTimeout);
    const movementX =
      (inverted ? 1 : -1) *
      ((event as MouseEvent).movementX ||
        (touchMovement(event as TouchEvent, 20) as ICustomTouch).movementX ||
        0);

    this.lastMouseMovement = movementX;

    // Calculate rotation angles based on mouse movement
    const rotationY = movementX * damping;
    this.objectYRot = clamp(-3, 3)(rotationY);

    console.log(movementX);

    animate({
      from: mesh.rotation[axis],
      to: mesh.rotation[axis] + this.objectYRot,
      onUpdate: (v) => {
        mesh.rotation[axis] = v;
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
}
