//styles
import "@styles/index.scss";

import { Container } from "@components/Container";
import { Sidepanel } from "@components/Sidepanel";

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  Route,
  RouterProvider,
} from "@tanstack/react-router";
import { createElement } from "react";
import { IRouteComponent } from "@ctypes/route";
import { GLModuleRoute, MainRoute } from "./routes";
import { Main } from "@components/Main";
import { TValidLang, validLang } from "@components/Language/Language";

const rootRoute = createRootRoute({
  component: () => (
    <Main>
      <Sidepanel items={MainRoute} />
      <Container>
        <Outlet />
      </Container>
    </Main>
  ),
});

const mapChildRoute = (routeList: IRouteComponent[], parentRoute: any) =>
  routeList.map(({ path, component, props, validateSearch }) =>
    createRoute({
      getParentRoute: () => parentRoute,
      path,
      validateSearch,
      ...(component && { component: () => createElement(component, props) }),
      // lang fallback, manually replace to the correct lang
      beforeLoad: ({ location }) => {

        const segments = location.pathname.split("/").filter(Boolean);
        const maybeLang = segments[0]?.toLowerCase();

        if (!validLang.includes(maybeLang as TValidLang)) {
          const newPath = ["/en", ...segments.slice(1)].join("/");
          throw redirect({
            to: "/" + newPath,
            replace: true,
          });
        }
      },
    }),
  );

rootRoute.addChildren([
  // primary route
  ...mapChildRoute(MainRoute, rootRoute),
  //glm modules route
  ...mapChildRoute(GLModuleRoute, rootRoute),
]);

const router = createRouter({ routeTree: rootRoute });

export default () => {
  return <RouterProvider router={router} />;
};
