import HomeIcon from "@icons/home.svg";
import LayoutIcon from "@icons/layout.svg";
import GridIcon from "@icons/grid.svg";
import FileIcon from "@icons/file-text.svg";
import PuzzleIcon from "@icons/puzzle.svg";
import { Resources } from "../pages";
import { ISidepanelItem } from "@components/Sidepanel/SidepanelItem";
import { IBackendRoute, IRouteComponent } from "@ctypes/route";
import { TValidLang } from "@components/Language/Language";

type RouteMapItem = ISidepanelItem & IRouteComponent;

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
    icon:HomeIcon,
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

const primaryRouteMap: RouteMapItem[] = [
  {
    icon: HomeIcon,
    path: "/$lang",
    label: "Home",
    component: Resources,
    props: {
      resource_id: 5,
      header: {
        title: "Browse Latest Web Design Tool",
        subtitle: "Improve and ease your workflow with extensive design tools",
        banner: "./assets/hero_visual.webp",
      },
    },
  },
  {
    icon: LayoutIcon,
    path: "$lang/templates",
    label: "Templates",
    component: Resources,
    props: {
      resource_id: 4,
      header: {
        title: "Templates",
        subtitle:
          "The latest documents to start your new design projects or next presentation",
      },
    },
  },
  {
    icon: GridIcon,
    path: "$lang/modules",
    label: "Modules",
    component: Resources,
    props: {
      resource_id: 2,
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
    path: "$lang/documents",
    label: "Documents",
    component: Resources,
    props: {
      resource_id: 1,
      header: {
        title: "Documents",
        subtitle: "All the documents useful for your project development.",
      },
    },
  },
  {
    icon: PuzzleIcon,
    path: "$lang/plugins",
    label: "Plugins",
    component: Resources,
    props: {
      resource_id: 3,
      header: {
        title: "Plugins",
        subtitle: "The usefull plugins to boost your creativity.",
      },
      filter: false,
    },
  },
];

export default primaryRouteMap;
