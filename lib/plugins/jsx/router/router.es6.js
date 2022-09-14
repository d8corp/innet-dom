import { useHandler } from '@innet/jsx';
import History from '@watch-state/history-api';
import innet from 'innet';
import { Cache } from 'watch-state';
import { Context, createContextHandler } from '../context/context.es6.js';
import { getSlots } from '../slot/slot.es6.js';

const history = new History();
const routerContext = new Context(1);
const parsedPath = new Cache(() => history.path.split('/').map(e => e || '/'), true);
const pathDeep = new Cache(() => parsedPath.value.length, true);
const routes = [];
const routesIsh = [];
function getStrongRoute(handler, deep = routerContext.get(handler)) {
    const routeIndex = deep - 1;
    if (!routes[routeIndex]) {
        routes[routeIndex] = new Cache(() => {
            if (pathDeep.value > deep + 1) {
                return '';
            }
            return parsedPath.value[deep] || '/';
        }, true);
    }
    return routes[routeIndex];
}
function useRoute() {
    return getRoute(useHandler());
}
function getRoute(handler, deep = routerContext.get(handler)) {
    const routeIndex = deep - 1;
    if (!routesIsh[routeIndex]) {
        routesIsh[routeIndex] = new Cache(() => parsedPath.value[deep] || '/', true);
    }
    return routesIsh[routeIndex];
}
function router({ props, children }, handler) {
    const slots = getSlots(handler, children);
    const deep = (props === null || props === void 0 ? void 0 : props.search) || routerContext.get(handler);
    const search = props && props.search;
    const ish = props && props.ish;
    return innet(() => {
        const route = search ? history.getSearch(String(search)) : ish ? getRoute(handler, deep).value : getStrongRoute(handler, deep).value;
        if (route && route in slots) {
            return search ? slots[route] : {
                type: () => {
                    innet(slots[route], createContextHandler(useHandler(), routerContext, deep + 1));
                },
            };
        }
        return slots[''];
    }, handler);
}

export { getRoute, getStrongRoute, history, parsedPath, pathDeep, router, routerContext, routes, routesIsh, useRoute };
