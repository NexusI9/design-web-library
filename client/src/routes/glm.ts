import { IRouteComponent } from "@ctypes/route";
import ModuleFrame from "@pages/ModuleFrame";

const GLMRouteMap: IRouteComponent[] = [
  {
    path: "modules/glm/slideshow",
    component: ModuleFrame,
    props: {
      title: "Slideshow",
      subtitle: "Customizable slideshow with unique transitions.",
      frames: [
        {
          url: "/static-modules/glm/slideshow/index.html",
          inputs: [
            {
              type: "INPUT_NUMBER",
              label: "Transition duration",
              min: 500,
              max: 10000,
              defaultValue: 1500,
              targetAttribute: "data-transition-duration",
            },
            {
              type: "INPUT_NUMBER",
              label: "Slide duration",
              min: 500,
              max: 10000,
              defaultValue: 1500,
              targetAttribute: "data-slide-duration",
            },
            {
              type: "INPUT_SELECT",
              label: "Slide duration",
              values: [
                { label: "Default", value: "default" },
                { label: "Slice", value: "slice" },
                { label: "Wave", value: "wave" },
                { label: "Store", value: "store" },
              ],
              defaultIndex: 0,
              targetAttribute: "data-transition-type",
            },
            {
              type: "INPUT_SELECT",
              label: "Navigation type",
              values: [
                { label: "Default", value: "default" },
                { label: "Automatic", value: "automatic" },
                { label: "Manual", value: "manual" },
              ],
              defaultIndex: 0,
              targetAttribute: "data-mode",
            },
          ],
        },
      ],
    },
  },
  {
    path: "modules/glm/carousel",
    component: ModuleFrame,
    props: {
      title: "Carousel",
      subtitle: "Customizable carousels with 2D or 3D rotations.",
      frames: [
        {
          url: "/static-modules/glm/carousel/index.html",
          inputs: [
            {
              type: "INPUT_SELECT",
              label: "Curve direction",
              values: [
                { label: "Outward", value: "outward" },
                { label: "Inward", value: "inward" },
                { label: "Fan", value: "fan" },
              ],
              defaultIndex: 0,
              targetAttribute: "data-curve",
            },
            {
              type: "INPUT_SELECT",
              label: "Movement direction",
              values: [
                { label: "Right", value: "right" },
                { label: "Left", value: "left" },
              ],
              defaultIndex: 0,
              targetAttribute: "data-direction",
            },
            {
              type: "INPUT_NUMBER",
              label: "Picture width",
              min: 100,
              max: 1920,
              defaultValue: 340,
              targetAttribute: "data-picture-width",
            },
            {
              type: "INPUT_NUMBER",
              label: "Picture height",
              min: 100,
              max: 1920,
              defaultValue: 544,
              targetAttribute: "data-picture-height",
            },
            {
              type: "INPUT_SELECT",
              label: "Invert drag",
              values: [
                { label: "True", value: "true" },
                { label: "False", value: "false" },
              ],
              defaultIndex: 0,
              targetAttribute: "data-invert-drag",
            },
          ],
        },
      ],
    },
  },
];

export default GLMRouteMap;
