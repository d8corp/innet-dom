'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');

function normalizeRoutes(routes) {
    return routes.map((route) => {
        if (!route.path)
            return route;
        const splitPath = route.path.split('/').filter(Boolean);
        if (!route.component &&
            !route.index &&
            splitPath.length === 1)
            return route;
        const { path } = route, rest = tslib.__rest(route, ["path"]);
        let currentRoute = rest;
        for (let i = splitPath.length - 1; i > -1; i--) {
            currentRoute = { path: splitPath[i], children: [currentRoute] };
        }
        return currentRoute;
    });
}

exports.normalizeRoutes = normalizeRoutes;
