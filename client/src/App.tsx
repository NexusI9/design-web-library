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
import { createElement, useContext, useEffect, useState } from "react";
import { IRouteComponent } from "@ctypes/route";
import { GLModuleRoute } from "./routes";
import { Main } from "@components/Main";
import { LangContext, validLang } from "@components/Language/Language";
import { fetchMainRoute } from "./routes/main";
import { Footer } from "@components/Footer";
import { ISidepanelItem } from "@components/Sidepanel/Item";
import { langRedirect, locationUpdateLang } from "@lib/utils";

/**
  Core website structure
 */
const setRootRoute = (pages: ISidepanelItem[]) =>
  createRootRoute({
    component: () => (
      <Main>
        <Sidepanel items={pages} />
        <Container>
          <>
            <Outlet />
            <Footer />
          </>
        </Container>
      </Main>
    ),
  });

export default () => {
  const [router, setRouter] = useState<any | null>(null);
  const { lang, setLang } = useContext(LangContext);

  useEffect(() => {

    // fallback language if not valid
    if(!validLang.includes(lang)) setLang("en");
    
    // Dynamically fetch routing since page structure is defined in backend
    fetchMainRoute(lang).then((routes) => {
      // create children route
      const mapChildRoute = (routeList: IRouteComponent[], parentRoute: any) =>
        routeList.map(({ path, component, props, validateSearch }) =>
          createRoute({
            getParentRoute: () => parentRoute,
            path,
            validateSearch,
            ...(component && {
              component: () => createElement(component, props),
            }),
            // lang fallback, manually replace to the correct lang
            beforeLoad: ({ location }) => langRedirect(location.pathname),
          }),
        );

      // create route tree
      const rootRoute = setRootRoute(routes);

      // automatically redirect to '/en' if arrive on '/'
      const indexRoute = createRoute({
        path: "/",
        getParentRoute: () => rootRoute,
        beforeLoad: ({ location }) => langRedirect(location.pathname),
      });

      rootRoute.addChildren([
        // index route (redirect)
        indexRoute,
        // primary route
        ...mapChildRoute(routes, rootRoute),
        //glm modules route
        ...mapChildRoute(GLModuleRoute, rootRoute),
      ]);

      // create router
      const router = createRouter({ routeTree: rootRoute });
      setRouter(router);
    });
  }, [lang]);

  if (!router) return null;

  return <RouterProvider router={router} />;
};
