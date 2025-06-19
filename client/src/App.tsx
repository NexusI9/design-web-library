//styles
import "@styles/index.scss";

import { Container } from "@components/Container";
import { Sidepanel } from "@components/Sidepanel";

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { createElement } from "react";
import { IRouteComponent } from "@ctypes/route";
import { GLModuleRoute, MainRoute } from "./routes";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Sidepanel items={MainRoute} />
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
  ...mapChildRoute(MainRoute),
  //glm modules route
  ...mapChildRoute(GLModuleRoute),
]);

const router = createRouter({ routeTree });

export default () => {
  return <RouterProvider router={router} />;
};
