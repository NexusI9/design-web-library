import * as THREE from "three";
import { ICustomTouch } from "../types/Events";
import { clamp, touchMovement } from "./utils";

export default class Dragger {
  state: "moving" | "complete" | "slow" = "complete";
  container: HTMLElement | undefined;
  mouseMouveTimeout: NodeJS.Timeout = setTimeout(() => false, 0);
  lastMouseMovement: number = 0;
  damping: number = 0.02;
  spring: number = 0.1;
  maxspeed: number = 10;
  inverted: boolean = false;
  axis: "x" | "y" | "z" = "x";
  mesh: THREE.Mesh | THREE.Group;
  #velocity: number = 0;
  #target: number = 0;
  #current: number = 0;

  boundRotate = this.rotate.bind(this);

  constructor({
    container,
    damping,
    spring,
    inverted,
    axis,
    mesh,
    maxspeed,
  }: Pick<
    Dragger,
    | "container"
    | "damping"
    | "inverted"
    | "axis"
    | "mesh"
    | "spring"
    | "maxspeed"
  >) {
    this.container = container;
    this.damping = damping;
    this.inverted = inverted;
    this.axis = axis;
    this.mesh = mesh;
    this.spring = spring;
    this.maxspeed = maxspeed;
  }

  get getState() {
    return this.state;
  }

  rotate(event: MouseEvent | TouchEvent) {
    if (!this.mesh) return;

    // update object state
    if (this.state == "complete") {
      const rotation = this.mesh.rotation[this.axis];
      this.#current = rotation;
      this.#target = rotation;
      this.state = "moving";
    }

    // update cursor style
    this.container?.setAttribute("data-cursor", "grab");

    clearTimeout(this.mouseMouveTimeout);
    const movementX =
      (this.inverted ? 1 : -1) *
      ((event as MouseEvent).movementX ||
        (touchMovement(event as TouchEvent, 20) as ICustomTouch).movementX ||
        0);

    this.lastMouseMovement = movementX;

    const delta = clamp(-this.maxspeed, this.maxspeed)(movementX);
    const force = Math.sign(delta) * Math.pow(Math.abs(delta), 1.3); // nonlinear
    this.#target += force * 0.005; // tuning factor
  }

  init() {
    // drag event
    this.container?.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", this.boundRotate);
    });

    // release event
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.boundRotate);
      this.container?.setAttribute("data-cursor", "default");
    });

    //touch events for mobiles
    this.container?.addEventListener("touchmove", this.boundRotate);

    this.update();
  }

  update() {
    requestAnimationFrame(this.update.bind(this));

    if (this.state !== "complete") {
      this.#velocity += (this.#target - this.#current) * this.spring;
      this.#velocity *= this.damping;
      this.#current += this.#velocity;

      // update states
      if (Math.abs(this.#velocity) < 0.01) this.state = "slow";
      if (Math.abs(this.#velocity) < 0.0001) this.state = "complete";

      // rotate mesh
      this.mesh.rotation[this.axis] = this.#current;
    }
  }
}
