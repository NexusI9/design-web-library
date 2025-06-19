//styles
import { ISidepanelItem } from "@components/Sidepanel/SidepanelItem";
import "@styles/index.scss";

import HomeIcon from "@icons/home.svg";
import LayoutIcon from "@icons/layout.svg";
import GridIcon from "@icons/grid.svg";
import FileIcon from "@icons/file-text.svg";
import PuzzleIcon from "@icons/puzzle.svg";

import { Container } from "@components/Container";
import { Sidepanel } from "@components/Sidepanel";

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { Resources, ModuleFrame } from "./pages";
import { createElement } from "react";

//https://tanstack.com/router/latest/docs/framework/react/quick-start

interface IRouteComponent {
  path: string;
  component: (props: any) => JSX.Element;
  props: Parameters<IRouteComponent["component"]>[0];
}

type RouteMapItem = ISidepanelItem & IRouteComponent;

const primaryRouteMap: RouteMapItem[] = [
  {
    icon: HomeIcon,
    path: "/",
    label: "Home",
    component: Resources,
    props: {
      header: {
        title: "Browse Latest Web Design Tool",
        subtitle: "Improve and ease your workflow with extensive design tools",
        picture: "./assets/hero_visual.webp",
      },
      type: "TOOL",
    },
  },
  {
    icon: LayoutIcon,
    path: "/templates",
    label: "Templates",
    component: Resources,
    props: {
      type: "TEMPLATE",
      header: {
        title: "Templates",
        subtitle:
          "The latest documents to start your new design projects or next presentation",
      },
    },
  },
  {
    icon: GridIcon,
    path: "/modules",
    label: "Modules",
    component: Resources,
    props: {
      type: "MODULE",
      header: {
        title: "Modules",
        subtitle:
          "The interactive library gathering all kinds of engaging visual effects",
      },
      filter: false,
    },
  },
  {
    icon: FileIcon,
    path: "/documents",
    label: "Documents",
    component: Resources,
    props: {
      type: "DOCUMENT",
      header: {
        title: "Documents",
        subtitle: "All the documents useful for your project development.",
      },
    },
  },
  {
    icon: PuzzleIcon,
    path: "/plugins",
    label: "Plugins",
    component: Resources,
    props: {
      type: "PLUGIN",
      header: {
        title: "Plugins",
        subtitle: "The usefull plugins to boost your creativity.",
      },
      filter: false,
    },
  },
];

const GLMRouteMap: IRouteComponent[] = [
  {
    path: "modules/glm/slideshow",
    component: ModuleFrame,
    props: {
      frameUrl: "/static-modules/glm/slideshow/index.html",
    },
  },
  {
    path: "modules/glm/carousel",
    component: ModuleFrame,
    props: {
      frameUrl: "/static-modules/glm/carousel/index.html",
    },
  },
];

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Sidepanel items={primaryRouteMap} />
      <Container>
        <Outlet />
      </Container>
    </>
  ),
});

const mapChildRoute = (routeList: IRouteComponent[]) =>
  routeList.map((route) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path: route.path,
      component: () => createElement(route.component, route.props),
    }),
  );

const routeTree = rootRoute.addChildren([
  // primary route
  ...mapChildRoute(primaryRouteMap),
  //glm modules route
  ...mapChildRoute(GLMRouteMap),
]);

const router = createRouter({ routeTree });

export default () => {
  return <RouterProvider router={router} />;
};
