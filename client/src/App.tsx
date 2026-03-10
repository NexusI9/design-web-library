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
import {
	fetchRoute,
	createMappedRoute,
	TRouteComponent,
	IFetchRouteResource,
} from "./routes/main";
import { Footer } from "@components/Footer";
import { langRedirect } from "@lib/utils";
import { LocaleContext } from "@components/Locale/Context";
import { LOCALE_DEFAULT, LOCALE_VALID_LIST } from "@components/Locale/constants";

/**
  Core website structure
 */
const setRootRoute = (pages: TRouteComponent<IFetchRouteResource>[]) =>
	createRootRoute({
		beforeLoad: ({ location }) => langRedirect(location.pathname),
		component: () => (
			<Main>
				<Sidepanel />
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
	const { activeLocale, setActiveLocale } = useContext(LocaleContext);

	useEffect(() => {
		// fallback language if not valid
		if (!LOCALE_VALID_LIST.includes(activeLocale)) setActiveLocale(LOCALE_DEFAULT);

		// Dynamically fetch routing since page structure is defined in backend
		fetchRoute(activeLocale).then((routes) => {

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
	}, [activeLocale]);

	if (!router) return null;

	return <RouterProvider router={router} />;
};
