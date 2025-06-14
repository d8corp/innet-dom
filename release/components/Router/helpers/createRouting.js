'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var normalizeRoutes = require('./normalizeRoutes.js');

function createRouting(routes, routing = {}, parentComponents = [], parentParams = [], parentFallbacks = [], parentPermissions = [], parentFallback) {
    var _a, _b, _c, _d, _e, _f, _g;
    const normalizedRoutes = normalizeRoutes.normalizeRoutes(routes);
    for (let i = 0; i < normalizedRoutes.length; i++) {
        const route = normalizedRoutes[i];
        const optional = (_a = route.path) === null || _a === void 0 ? void 0 : _a.endsWith('?');
        const pathKey = optional ? (_b = route.path) === null || _b === void 0 ? void 0 : _b.slice(0, -1) : route.path;
        const components = route.component
            ? [...parentComponents, route.component]
            : parentComponents;
        const fallback = route.component ? [...parentFallbacks, (_c = route.fallback) !== null && _c !== void 0 ? _c : parentFallback] : parentFallbacks;
        const permissions = route.permissions ? [...parentPermissions, ...route.permissions] : parentPermissions;
        if (pathKey) {
            if (pathKey.startsWith(':') && !pathKey.endsWith(']')) {
                const paramKey = pathKey.substring(1);
                const params = [...parentParams, paramKey];
                if (!routing.children) {
                    routing.children = {};
                }
                createRouting(route.children, routing.children, components, params, fallback, permissions, (_d = route.childrenFallback) !== null && _d !== void 0 ? _d : parentFallback);
            }
            else {
                if (!routing.strict) {
                    routing.strict = {};
                }
                const [paramKey, unionPath] = pathKey.startsWith(':') ? pathKey.slice(1, -1).split('[') : [undefined, pathKey];
                const params = paramKey ? [...parentParams, paramKey] : [...parentParams, ''];
                for (const key of unionPath.split('|')) {
                    if (!routing.strict[key]) {
                        routing.strict[key] = {};
                    }
                    createRouting(route.children, routing.strict[key], components, params, fallback, permissions, (_e = route.childrenFallback) !== null && _e !== void 0 ? _e : parentFallback);
                }
            }
            if (!optional)
                continue;
        }
        if (route.index) {
            if (permissions.length) {
                if (!routing.indexList) {
                    routing.indexList = [];
                }
                routing.indexList.push({
                    components,
                    permissions: new Set(permissions),
                    fallback,
                    params: parentParams,
                });
                continue;
            }
            if (routing.index) {
                throw Error('Routing Error. Do not use index routes twice.');
            }
            routing.index = {
                components,
                fallback,
                params: parentParams,
            };
            continue;
        }
        if ((_f = route.children) === null || _f === void 0 ? void 0 : _f.length) {
            createRouting(route.children, routing, components, parentParams, fallback, permissions, (_g = route.childrenFallback) !== null && _g !== void 0 ? _g : parentFallback);
            continue;
        }
        if (permissions.length) {
            if (!routing.restList) {
                routing.restList = [];
            }
            routing.restList.push({
                components,
                permissions: new Set(permissions),
                fallback,
                params: parentParams,
            });
            continue;
        }
        if (routing.rest) {
            throw Error('Routing Error. Do not use the same routes.');
        }
        routing.rest = {
            components,
            fallback,
            params: parentParams,
        };
    }
    return routing;
}

exports.createRouting = createRouting;
