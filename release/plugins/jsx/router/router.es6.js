import { Context, useSlots, createContextHandler } from '@innet/jsx';
import { locationSearch, locationPath } from '@watch-state/history-api';
import innet, { useHandler, runPlugins, useApp } from 'innet';
import { Cache } from 'watch-state';
import '../../../hooks/index.es6.js';
import '../../../utils/index.es6.js';
import '../../../utils/parseSearch/index.es6.js';
import '../map/index.es6.js';
import { parseSearch } from '../../../utils/parseSearch/parseSearch.es6.js';
import { use } from '../../../utils/use/use.es6.js';
import { useMapValue } from '../../../hooks/useMapValue/useMapValue.es6.js';
import { map } from '../map/map.es6.js';

const routerContext = new Context(1);
const parsedSearch = new Cache(() => parseSearch(locationSearch.value));
const parsedPath = new Cache(() => locationPath.value.split('/').map(e => e || '/'), true);
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
    runPlugins({
        type: 'router-loop',
        props: { of: () => currentSlots.value },
        children: [{
                type() {
                    return update => slots[use(useMapValue(), update)];
                },
            }],
    }, handler, [map]);
}
function router() {
    const { props } = useApp();
    const handler = useHandler();
    const slots = useSlots();
    const deep = (props === null || props === void 0 ? void 0 : props.search) || routerContext.get(handler);
    const search = props === null || props === void 0 ? void 0 : props.search;
    const ish = props === null || props === void 0 ? void 0 : props.ish;
    if (search && ish) {
        renderSearchIsh(String(search), slots, handler);
        return;
    }
    const curRoute = search
        ? new Cache(() => {
            const value = parsedSearch.value[search];
            return Array.isArray(value) ? String(value[0]) : String(value);
        })
        : ish ? getRoute(handler, deep) : getStrongRoute(handler, deep);
    const slot = new Cache(() => {
        const route = curRoute.value;
        if (route && route in slots) {
            return slots[route];
        }
        return slots[''];
    });
    innet(() => {
        const currentSlot = slot.value;
        if (currentSlot !== slots['']) {
            return search
                ? currentSlot
                : {
                    type: () => {
                        innet(currentSlot, createContextHandler(useHandler(), routerContext, deep + 1));
                    },
                };
        }
        return currentSlot;
    }, handler);
}

export { getRoute, getStrongRoute, parsedPath, parsedSearch, pathDeep, router, routerContext, routes, routesIsh, useRoute };
