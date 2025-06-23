import * as THREE from "three";
import "./styles/index.scss";
import Picture from "./picture";
import Viewer from "./viewer";
import {
  setCirclePosRot,
  getPictureFromUUID,
  repeatArray,
  radiusFromLength,
  normalizeDimension,
} from "./utils";
import ThreeScene from "../lib/three-scene";
import { configFromDataSet } from "../lib/utils";
import { ISceneConfig } from "../types/Scene";
import Dragger from "../lib/dragger";

export interface ICarouselConfig {
  curve: "outward" | "inward" | "fan";
  pictureAmount: number;
  direction: "right" | "left";
  pictureWidth: number;
  pictureHeight: number;
  minRadius: number;
  invertDrag: number;
  borderRadius: number;
  borderSmooth: number;
  cameraDistance: number;
}

export default class extends ThreeScene {
  //runtime
  play = true;

  //pivot movement related variables
  radius = 1300;
  pivot = new THREE.Group();
  curve = "outward";
  rotationAxis: "x" | "y" | "z" = "y";
  curveRotationAxis: { [key: keyof ISceneConfig["curve"]]: "x" | "y" | "z" } = {
    outward: "y",
    inward: "y",
    fan: "z",
  };
  dragger: Dragger | undefined;

  //full view
  lastHoverPicture: Picture | undefined;
  viewer = new Viewer({
    onClose: () => {
      this.play = true;
      this.render();
    },
    onShow: () => (this.play = false),
  });

  //Constants
  IMAGES_SELECTOR = ".glm-carousel-picture";
  IMAGE_NORM_WIDTH = 340;

  config: ISceneConfig = {
    curve: "outward",
    pictureAmount: 21,
    direction: "right",
    pictureWidth: 340,
    pictureHeight: 544,
    minRadius: 1300,
    invertDrag: 0,
    borderRadius: 0,
    borderSmooth: 8,
    cameraDistance: 0,
  };

  images: Element[] | Picture[];

  constructor(container: HTMLElement) {
    super(container);

    //set global config
    this.config = configFromDataSet(this.config, this.container.dataset);
    const imagesList = container.querySelectorAll(this.IMAGES_SELECTOR);

    this.images = repeatArray(imagesList, this.config.pictureAmount);

    this.radius = Math.max(
      this.config.minRadius,
      radiusFromLength(this.images.length),
    );

    this.clock = new THREE.Clock();
  }

  init() {
    super.init();
    if (!this.images) {
      return console.warn("No images has been found");
    }

    //set config
    this.curve = this.container.dataset.curve || this.curve;

    //init viewer
    this.viewer.init();

    //normalize picture dimension
    const { width, height } = normalizeDimension(
      this.IMAGE_NORM_WIDTH,
      this.config.pictureWidth,
      this.config.pictureHeight,
    );
    this.config.pictureWidth = width;
    this.config.pictureHeight = height;

    //generate picture meshes from img list
    this.generatePictures();

    switch (this.config.curve) {
      case "inward":
        this.pivot.position.set(0, 0, -2 * this.radius);
        break;

      case "fan":
        this.pivot.position.set(0, -this.radius, -1 * this.radius);
        break;
    }

    this.rotationAxis = this.curveRotationAxis[this.curve] || this.rotationAxis;

    //call document related events
    this.events();

    //adjust canera zoon
    this.camera?.position.set(0, 0, this.config.cameraDistance);

    this.render();
  }

  events() {
    //set dragging effect
    this.dragger = new Dragger({
      container: this.renderer.domElement,
      mesh: this.pivot,
      damping: 0.2,
      spring: 0.1,
      inverted:
        this.config.invertDrag == 1 ||
        (this.config.curve == "inward" && this.config.invertDrag == 0),
      axis: this.rotationAxis,
    });

    this.dragger.init();

    //raycast system on panel click to display the viewer
    this.renderer.domElement.addEventListener(
      "mousemove",
      (e) => this.onMouseMove(e),
      false,
    );
    this.renderer.domElement.addEventListener(
      "click",
      this.onCanvasClick.bind(this),
      false,
    );
  }

  onMouseMove(e: MouseEvent) {
    const raycast = this.raycast(e);
    if (!raycast) {
      return;
    }
    // Check if any object was clicked
    if (raycast.length > 0) {
      if (this.dragger?.getState === "slow")
        this.container.setAttribute("data-cursor", "pointer");

      const hoverPlane = raycast.find(
        (intersect) => intersect.object instanceof THREE.Mesh,
      );
      if (hoverPlane) {
        this.lastHoverPicture = getPictureFromUUID(
          hoverPlane.object.uuid,
          this.images as Picture[],
        );
      }
    } else {
      this.container.setAttribute("data-cursor", "defaut");
      this.lastHoverPicture = undefined;
    }
  }

  generatePictures() {
    this.images = this.images.map((img, index) => {
      const picture = new Picture({
        element: img,
        parent: this.pivot,
        container: this.container,
        id: index,
        width: this.config.pictureWidth,
        height: this.config.pictureHeight,
        borderRadius: parseInt(this.config.borderRadius),
        borderSmooth: parseInt(this.config.borderSmooth),
      });
      picture.init();

      //revert side if inward curve
      if (picture.mesh) {
        //position pictures around a circle
        setCirclePosRot({
          index,
          mesh: picture.mesh,
          total: this.images.length,
          radius: this.radius,
          mode: this.config.curve === "fan" ? "FAN" : "CYLINDER",
        });

        switch (this.config.curve) {
          case "inward":
            picture.mesh.material.side = THREE.BackSide;
            picture.mesh.scale.x *= -1;
            break;
        }

        this.pivot.add(picture.mesh);
      }

      return picture;
    });

    this.scene.add(this.pivot);
  }

  onCanvasClick() {
    //cancel if user is actually scrolling and not clicking
    if (this.dragger?.getState === "moving") return;

    if (this.lastHoverPicture) {
      //if found picture with same uuid and the one targeted by raycast => load picture in viewer and show
      this.viewer.loadPicture(this.lastHoverPicture.picture);
      this.viewer.show();
    }
  }

  render() {
    super.render();

    if (this.dragger?.getState === "complete") {
      this.pivot.rotation[this.rotationAxis] +=
        (((this.config.curve === "outward" &&
          this.config.direction == "right") ||
        (this.config.curve == "inward" && this.config.direction == "left")
          ? -1
          : 1) *
          this.cameraRotateSpeed) /
        60;
    }
  }
}
