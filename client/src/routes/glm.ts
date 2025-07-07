import {
  MODULE_GLM_CHANNEL_CAROUSEL,
  MODULE_GLM_CHANNEL_SLIDESHOW,
} from "@components/Modules/glm/lib/constant";
import { IRouteComponent } from "@ctypes/route";
import ModuleFrame from "@pages/EmbedModules";

import { z } from "zod";

export const modulesSearchSchema = z.object({
  "data-transition-duration": z.string().optional(),
  "data-slide-duration": z.string().optional(),
  "data-transition-type": z.string().optional(),
  "data-mode": z.string().optional(),
  "data-curve": z.string().optional(),
  "data-direction": z.string().optional(),
  "data-picture-width": z.string().optional(),
  "data-picture-height": z.string().optional(),
  "data-border-radius": z.string().optional(),
  "data-border-smooth": z.string().optional(),
  "data-invert-drag": z.string().optional(),
});

const GLMRouteMap: IRouteComponent[] = [
  {
    path: "$lang/modules/glm/slideshow",
    component: ModuleFrame,
    validateSearch: modulesSearchSchema,
    props: {
      title: "Slideshow",
      subtitle: "Customizable slideshow with unique transitions.",
      frames: [
        {
          module: "slideshow",
          url: `${process.env.SERVER_URL}/public/modules/glm/slideshow/index.php`,
          channel: MODULE_GLM_CHANNEL_SLIDESHOW,
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
              label: "Transition type",
              values: [
                { label: "Default", value: "default" },
                { label: "Lens", value: "lens" },
                { label: "Swipe", value: "swipe" },
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
    path: "$lang/modules/glm/carousel",
    component: ModuleFrame,
    props: {
      title: "Carousel",
      subtitle: "Customizable carousels with 2D or 3D rotations.",
      frames: [
        {
          module: "carousel",
          url: `${process.env.SERVER_URL}/public/modules/glm/carousel/index.php`,
          channel: MODULE_GLM_CHANNEL_CAROUSEL,
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
              type: "INPUT_NUMBER",
              label: "Border radius",
              min: 0,
              max: 100,
              defaultValue: 12,
              targetAttribute: "data-border-radius",
            },
            {
              type: "INPUT_NUMBER",
              label: "Border smooth",
              min: 1,
              max: 8,
              defaultValue: 4,
              targetAttribute: "data-border-smooth",
            },
            {
              type: "INPUT_SELECT",
              label: "Invert drag",
              values: [
                { label: "True", value: "true" },
                { label: "False", value: "false" },
              ],
              defaultIndex: 1,
              targetAttribute: "data-invert-drag",
            },
          ],
        },
      ],
    },
  },
];

export default GLMRouteMap;
