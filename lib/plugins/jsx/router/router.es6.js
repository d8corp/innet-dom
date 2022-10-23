import { Context, useHandler, getSlots, createContextHandler } from '@innet/jsx';
import History from '@watch-state/history-api';
import innet from 'innet';
import { Cache } from 'watch-state';
import { parseSearch } from '../../../utils/parseSearch/parseSearch.es6.js';
import { loop } from '../loop/loop.es6.js';

const history = new History();
const routerContext = new Context(1);
const parsedSearch = new Cache(() => parseSearch(history.search));
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
function renderSearchIsh(key, slots, handler) {
    const currentSlots = new Cache(() => {
        const result = parsedSearch.value[key];
        if (!result)
            return [];
        if (Array.isArray(result))
            return result;
        return [result];
    });
    return loop({
        type: 'router-loop',
        props: { of: () => currentSlots.value },
        children: [({ value }) => slots[value]],
    }, handler);
}
function router({ props, children }, handler) {
    const slots = getSlots(handler, children);
    const deep = (props === null || props === void 0 ? void 0 : props.search) || routerContext.get(handler);
    const search = props && props.search;
    const ish = props && props.ish;
    if (search && ish) {
        return renderSearchIsh(String(search), slots, handler);
    }
    const slot = new Cache(() => {
        const route = search ? history.getSearch(String(search)) : ish ? getRoute(handler, deep).value : getStrongRoute(handler, deep).value;
        if (route && route in slots) {
            return slots[route];
        }
        return slots[''];
    });
    return innet(() => {
        const currentSlot = slot.value;
        if (currentSlot !== slots['']) {
            return search ? currentSlot : {
                type: () => {
                    innet(currentSlot, createContextHandler(useHandler(), routerContext, deep + 1));
                },
            };
        }
        return currentSlot;
    }, handler);
}

export { getRoute, getStrongRoute, history, parsedPath, parsedSearch, pathDeep, router, routerContext, routes, routesIsh, useRoute };
