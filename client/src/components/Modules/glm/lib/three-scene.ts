/**
 * Default Three JS Scene
 * Includes basic methods like Init, Render, Viewscope system
 *
 */

import * as THREE from "three";
import { clamp, touchMovement } from "./utils";

//@ts-ignore
import * as TWEEN from "@tweenjs/tween.js";
import ViewScope from "./viewscope";
import { ICustomTouch } from "../types/Events";

export default class {
  //runtime
  play: boolean = true;

  //camera movement related variables
  objectYRot: number = 0;
  lastMouseMovement: number = 0;
  cameraRotateSpeed: number = 0.05;
  mouseMouveTimeout: NodeJS.Timeout = setTimeout(() => false, 0);

  perspective = window.innerWidth / window.innerHeight;

  container: HTMLElement;
  clock = new THREE.Clock();
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  camera?: THREE.PerspectiveCamera | THREE.OrthographicCamera;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  init() {
    if (!this.container) {
      return console.warn("No container has been found");
    }

    // clean up, remove existing canvas
    this.container.querySelectorAll("canvas").forEach((item) => item.remove());

    //generate picture meshes from img list
    this.setupRenderer();
    this.perspectiveCamera();

    //Set viewscope
    new ViewScope({
      container: this.container,
      onEnter: () => {
        this.play = true;
        this.render();
      },
      onExit: () => {
        this.play = false;
      },
    }).init();
  }

  setViewPortSize() {
    const { width, height } = this.container.getBoundingClientRect();
    return { width, height };
  }

  get viewport() {
    const { width, height } = this.setViewPortSize();
    let aspectRatio = width / height;
    return {
      width,
      height,
      aspectRatio,
    };
  }

  perspectiveCamera() {
    // Initialize perspective camera
    const fov =
      (400 * (2 * Math.atan(window.innerWidth / 2 / this.perspective))) /
      Math.PI; // see fov image for a picture breakdown of this fov setting.
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.viewport.aspectRatio,
      0.1,
      10000,
    );
    this.camera.position.set(0, 0, 0); // set the camera position on the z axis.
    this.camera.updateProjectionMatrix();

    window.removeEventListener("resize", this.onOrthographicWindowResize);
    window.addEventListener("resize", this.onPerspectiveWindowResize, false);
  }

  orthographicCamera() {
    const { width, height } = this.viewport;

    this.camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2, // left, right
      height / 2,
      -height / 2, // top, bottom
      0.1,
      1000, // near, far
    );

    this.camera.position.set(0, 0, 1);
    this.camera.updateProjectionMatrix();

    window.removeEventListener("resize", this.onPerspectiveWindowResize);
    window.addEventListener("resize", this.onOrthographicWindowResize, false);
  }

  onPerspectiveWindowResize() {
    if (!this.camera) {
      return;
    }
    this.camera = this.camera as THREE.PerspectiveCamera;
    this.camera.aspect = this.viewport.aspectRatio; // readjust the aspect ratio.
    this.camera.updateProjectionMatrix(); // Used to recalulate projectin dimensions.
    this.renderer.setSize(this.viewport.width, this.viewport.height);
  }

  onOrthographicWindowResize() {
    if (!this.camera) {
      return;
    }
    const { width, height } = this.viewport;
    this.camera = this.camera as THREE.OrthographicCamera;

    this.camera.left = -width / 2;
    this.camera.right = width / 2;
    this.camera.top = height / 2;
    this.camera.bottom = -height / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  rotateObject(
    event: MouseEvent | TouchEvent,
    mesh: THREE.Mesh | THREE.Group,
    { damping = 0.02, inverted = false, axis = "y" },
  ) {
    this.container.setAttribute("data-cursor", "grab");

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

    /*
        NOTE: 
            Need to use Tween within a small setTimeout, else it becomes laggy on chrome
        */
    setTimeout(() => {
      new TWEEN.Tween(mesh.rotation)
        .to({ [axis]: mesh.rotation.y + this.objectYRot }, 2000)
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
    }, 10);

    //reset to default speed if no more movement
    this.mouseMouveTimeout = setTimeout(() => {
      if (this.lastMouseMovement === movementX) {
        this.objectYRot = 0;
        this.lastMouseMovement = 0;
      }
    }, 1000);
  }

  raycast(event: MouseEvent) {
    if (!this.camera) {
      return;
    }
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Create a raycaster from the camera and mouse position
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    // Calculate objects intersecting the raycaster
    const intersects = raycaster.intersectObjects(this.scene.children, true);

    return intersects;
  }

  setupRenderer() {
    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.viewport.width, this.viewport.height); // uses the getter viewport function above to set size of canvas / renderer
    this.renderer.setPixelRatio(window.devicePixelRatio); // Import to ensure image textures do not appear blurred.

    switch (this.container.nodeName) {
      case "IMG":
        //wrap image in new container to append canvas properly
        const parent = this.container.parentElement;
        const wrapper = document.createElement("div");
        wrapper.style.display = "inline-block";

        if (parent) {
          parent.insertBefore(wrapper, this.container);
          parent.appendChild(this.container);
          this.container.remove();
          this.container = wrapper;
        }

      default:
        this.container.appendChild(this.renderer.domElement); // append the canvas to the main element
    }
  }

  render() {
    if (!this.play) {
      return;
    }

    //TWEEN.update();
    if (this.camera) this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}
