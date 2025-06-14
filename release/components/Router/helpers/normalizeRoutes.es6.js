import { __rest } from 'tslib';

function normalizeRoutes(routes) {
    return routes.map((route) => {
        if (!route.path)
            return route;
        const splitPath = route.path.split('/').filter(Boolean);
        if (!route.component &&
            !route.index &&
            splitPath.length === 1)
            return route;
        const { path } = route, rest = __rest(route, ["path"]);
        let currentRoute = rest;
        for (let i = splitPath.length - 1; i > -1; i--) {
            currentRoute = { path: splitPath[i], children: [currentRoute] };
        }
        return currentRoute;
    });
}

export { normalizeRoutes };
