'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var History = require('@watch-state/history-api');
var innet = require('innet');
var watchState = require('watch-state');
require('../../../utils/parseSearch/index.js');
require('../loop/index.js');
var parseSearch = require('../../../utils/parseSearch/parseSearch.js');
var loop = require('../loop/loop.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var History__default = /*#__PURE__*/_interopDefaultLegacy(History);
var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const history = new History__default["default"]();
const routerContext = new jsx.Context(1);
const parsedSearch = new watchState.Cache(() => parseSearch.parseSearch(history.search));
const parsedPath = new watchState.Cache(() => history.path.split('/').map(e => e || '/'), true);
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
    return getRoute(jsx.useHandler());
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
    return loop.loop({
        type: 'router-loop',
        props: { of: () => currentSlots.value },
        children: [({ value }) => slots[value]],
    }, handler);
}
function router({ props, children }, handler) {
    const slots = jsx.getSlots(handler, children);
    const deep = (props === null || props === void 0 ? void 0 : props.search) || routerContext.get(handler);
    const search = props === null || props === void 0 ? void 0 : props.search;
    const ish = props === null || props === void 0 ? void 0 : props.ish;
    if (search && ish) {
        return renderSearchIsh(String(search), slots, handler);
    }
    const slot = new watchState.Cache(() => {
        const route = search ? history.getSearch(String(search)) : ish ? getRoute(handler, deep).value : getStrongRoute(handler, deep).value;
        if (route && route in slots) {
            return slots[route];
        }
        return slots[''];
    });
    return innet__default["default"](() => {
        const currentSlot = slot.value;
        if (currentSlot !== slots['']) {
            return search
                ? currentSlot
                : {
                    type: () => {
                        innet__default["default"](currentSlot, jsx.createContextHandler(jsx.useHandler(), routerContext, deep + 1));
                    },
                };
        }
        return currentSlot;
    }, handler);
}

exports.getRoute = getRoute;
exports.getStrongRoute = getStrongRoute;
exports.history = history;
exports.parsedPath = parsedPath;
exports.parsedSearch = parsedSearch;
exports.pathDeep = pathDeep;
exports.router = router;
exports.routerContext = routerContext;
exports.routes = routes;
exports.routesIsh = routesIsh;
exports.useRoute = useRoute;
