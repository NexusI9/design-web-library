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
import { useContext, useEffect, useState } from "react";
import { Main } from "@components/Main";
import { LangContext, validLang } from "@components/Language/Language";
import {
  fetchRoute,
  createMappedRoute,
  TRouteComponent,
  IFetchRouteResource,
} from "./routes/main";
import { Footer } from "@components/Footer";
import { langRedirect } from "@lib/utils";

/**
  Core website structure
 */
const setRootRoute = (pages: TRouteComponent<IFetchRouteResource>[]) =>
  createRootRoute({
    beforeLoad: ({ location }) => langRedirect(location.pathname),
    component: () => (
      <Main>
        <Sidepanel/>
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
    if (!validLang.includes(lang)) setLang("en");

    // Dynamically fetch routing since page structure is defined in backend
    fetchRoute(lang).then((routes) => {

      // Create route tree
      const rootRoute = setRootRoute(routes);

      // create lang route
      const langRoute = createRoute({
        path: "$lang",
        getParentRoute: () => rootRoute,
      });

      createMappedRoute(routes, langRoute);

      //langRoute.addChildren(primaryRoute);
      rootRoute.addChildren([langRoute]);

      // create router
      const router = createRouter({ routeTree: rootRoute });

      setRouter(router);
    });
  }, [lang]);

  if (!router) return null;

  return <RouterProvider router={router} />;
};
