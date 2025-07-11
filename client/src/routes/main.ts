import { Resources } from "../pages";
import { IBackendRoute } from "@ctypes/route";
import { TValidLang } from "@components/Language/Language";

/**
   Dynamicall fetch the main routes from the server API
   and convert them to a tanstack/ react compatible route.
 */
export const fetchMainRoute = async (lang: TValidLang) => {
  const resp = await fetch(`${process.env.API_URL}/${lang}/routes/page/all`);
  const routes = await resp.json();

  // convert backend route to tanstack-react route
  const mainRoutes = routes.map((route: IBackendRoute) => ({
    path: `$lang${route.path}`,
    label: route.name,
    component: Resources,
    icon:route.icon,
    props: {
      resource_id: route.resource_id,
      header: {
        title: route.title,
        subtitle: route.subtitle,
        banner: route.banner,
      },
      filter: route.filter != undefined ? route.filter : true,
    },
  }));

  return mainRoutes;
};
