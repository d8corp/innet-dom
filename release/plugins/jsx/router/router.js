'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var historyApi = require('@watch-state/history-api');
var innet = require('innet');
var watchState = require('watch-state');
require('../../../hooks/index.js');
require('../../../utils/index.js');
require('../../../utils/parseSearch/index.js');
require('../map/index.js');
var parseSearch = require('../../../utils/parseSearch/parseSearch.js');
var use = require('../../../utils/use/use.js');
var useMapValue = require('../../../hooks/useMapValue/useMapValue.js');
var map = require('../map/map.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const routerContext = new jsx.Context(1);
const parsedSearch = new watchState.Cache(() => parseSearch.parseSearch(historyApi.locationSearch.value));
const parsedPath = new watchState.Cache(() => historyApi.locationPath.value.split('/').map(e => e || '/'), true);
const pathDeep = new watchState.Cache(() => parsedPath.value.length, true);
const routes = [];
const routesIsh = [];
function getStrongRoute(handler, deep = routerContext.get(handler)) {
    const routeIndex = deep - 1;
    if (!routes[routeIndex]) {
        routes[routeIndex] = new watchState.Cache(() => {
            if (pathDeep.value > deep + 1) {
                return '';
            }
            return parsedPath.value[deep] || '/';
        }, true);
    }
    return routes[routeIndex];
}
function useRoute() {
    return getRoute(innet.useHandler());
}
function getRoute(handler, deep = routerContext.get(handler)) {
    const routeIndex = deep - 1;
    if (!routesIsh[routeIndex]) {
        routesIsh[routeIndex] = new watchState.Cache(() => parsedPath.value[deep] || '/', true);
    }
    return routesIsh[routeIndex];
}
function renderSearchIsh(key, slots, handler) {
    const currentSlots = new watchState.Cache(() => {
        const result = parsedSearch.value[key];
        if (!result)
            return [];
        if (Array.isArray(result))
            return result;
        return [result];
    });
    innet.runPlugins({
        type: 'router-loop',
        props: { of: () => currentSlots.value },
        children: [{
                type() {
                    return update => slots[use.use(useMapValue.useMapValue(), update)];
                },
            }],
    }, handler, [map.map]);
}
function router() {
    const { props } = innet.useApp();
    const handler = innet.useHandler();
    const slots = jsx.useSlots();
    const deep = (props === null || props === void 0 ? void 0 : props.search) || routerContext.get(handler);
    const search = props === null || props === void 0 ? void 0 : props.search;
    const ish = props === null || props === void 0 ? void 0 : props.ish;
    if (search && ish) {
        renderSearchIsh(String(search), slots, handler);
        return;
    }
    const curRoute = search
        ? new watchState.Cache(() => {
            const value = parsedSearch.value[search];
            return Array.isArray(value) ? String(value[0]) : String(value);
        })
        : ish ? getRoute(handler, deep) : getStrongRoute(handler, deep);
    const slot = new watchState.Cache(() => {
        const route = curRoute.value;
        if (route && route in slots) {
            return slots[route];
        }
        return slots[''];
    });
    innet__default["default"](() => {
        const currentSlot = slot.value;
        if (currentSlot !== slots['']) {
            return search
                ? currentSlot
                : {
                    type: () => {
                        innet__default["default"](currentSlot, jsx.createContextHandler(innet.useHandler(), routerContext, deep + 1));
                    },
                };
        }
        return currentSlot;
    }, handler);
}

exports.getRoute = getRoute;
exports.getStrongRoute = getStrongRoute;
exports.parsedPath = parsedPath;
exports.parsedSearch = parsedSearch;
exports.pathDeep = pathDeep;
exports.router = router;
exports.routerContext = routerContext;
exports.routes = routes;
exports.routesIsh = routesIsh;
exports.useRoute = useRoute;
