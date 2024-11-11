//styles
import { ISidepanelItem } from "@components/Sidepanel/SidepanelItem";
import "@styles/index.scss";

import HomeIcon from '@icons/home.svg';
import LayoutIcon from '@icons/layout.svg';
import GridIcon from '@icons/grid.svg';
import FileIcon from '@icons/file-text.svg';
import { Container } from "@components/Container";
import { Sidepanel } from "@components/Sidepanel";

import { createRootRoute, createRoute, createRouter, Outlet, Route, RouteComponent, RouterProvider } from '@tanstack/react-router'
import { Home } from "./pages";

//https://tanstack.com/router/latest/docs/framework/react/quick-start


const routeMap: ISidepanelItem[] = [
    { icon: HomeIcon, path: '/',  label: 'Home', component: Home},
    { icon: LayoutIcon, path: '/templates', label: 'Templates', component: Home },
    { icon: GridIcon, path: '/modules', label: 'Modules', component: Home },
    { icon: FileIcon, path: '/documents', label: 'Documents', component: Home },
    { icon: FileIcon, path: '/plugins', label: 'Plugins', component: Home},
];


const rootRoute = createRootRoute({
    component: () => (<Container>
        <>
            <Sidepanel items={routeMap} />
            <Outlet/>
        </>
    </Container>)
});

const routeTree = rootRoute.addChildren(
    routeMap.map(route => createRoute({
        getParentRoute: () => rootRoute,
        path: route.path,
        component: route.component as any,
    }) )
);

const router = createRouter({routeTree});


export default () => {
    return (
        <RouterProvider router={router} />
    );
}