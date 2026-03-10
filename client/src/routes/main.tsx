import { ModuleFrame, Resources } from "../pages";
import { TValidLang } from "@components/Language/Language";
import { createElement } from "react";
import { createRoute, RouteOptions } from "@tanstack/react-router";
import { langRedirect } from "@lib/utils";
import { IEmbedModule } from "@pages/EmbedModules";
import { IResources } from "@pages/Resources";

type TFetchRouteComponent = "RESOURCE" | "MODULE";

interface IFetchRouteBase {
  path: string;
  component: TFetchRouteComponent;
  validateSearch?: RouteOptions["validateSearch"];
  children?: TFetchRoute[];
}

export interface IFetchRouteResource extends IFetchRouteBase {
  component: "RESOURCE";
  label: string;
  icon: string;
  props: IResources;
}

export interface IFetchRouteModule extends IFetchRouteBase {
  component: "MODULE";
  props: IEmbedModule;
}

type TFetchRoute = IFetchRouteResource | IFetchRouteModule;

export type TRouteComponent<T> = Omit<T, "component" | "children"> & {
  children?: TRouteComponent<TFetchRoute>[];
  component: (props: any) => JSX.Element;
};

/**
  Convert fetched routes from backed to front-end routing compatible routes by:
  1. Replacing type based components to React components
  2. Converting nested/children routes as well
 */
const convertRoute = (
  routes: TFetchRoute[],
): TRouteComponent<TFetchRoute>[] => {
  return routes.map<TRouteComponent<TFetchRoute>>((route) => {
    // reccurssive for children routes
    const children = route.children ? convertRoute(route.children) : undefined;

    switch (route.component) {
      case "RESOURCE":
        return {
          ...route,
          ...(children ? { children } : {}),
          component: Resources,
        } as TRouteComponent<IFetchRouteResource>;

      case "MODULE":
        return {
          ...route,
          ...(children ? { children } : {}),
          component: ModuleFrame,
        } as TRouteComponent<IFetchRouteModule>;
    }
  });
};

/**
   Dynamicall fetch the main routes from the server API
   and convert them to a tanstack/ react compatible route.
 */
export const fetchRoute = async (
  lang: TValidLang,
): Promise<TRouteComponent<IFetchRouteResource>[]> => {
  
  const resp = await fetch(`${process.env.API_URL}/${lang}/routes/page/all`);
  const routes = (await resp.json()) as TFetchRoute[];

  // convert backend route to tanstack-react route
  return convertRoute(routes) as TRouteComponent<IFetchRouteResource>[];
};

// create children route
export const createMappedRoute = (
  routeList: TRouteComponent<TFetchRoute>[],
  parentRoute: any,
) => {
  const childrenRoutes = routeList.map(
    ({ path, component, props, validateSearch, children }) => {
      const route = createRoute({
        getParentRoute: () => parentRoute,
        path,
        validateSearch,
        component: () => createElement(component, props),
        // lang fallback, manually replace to the correct lang
        beforeLoad: ({ location }) => langRedirect(location.pathname),
      });

      // add children routes
      if (children) {
        const mappedChildren = createMappedRoute(children, route);
        route.addChildren(mappedChildren);
      }
      return route;
    },
  );

  parentRoute.addChildren(childrenRoutes);

  return childrenRoutes;
};
