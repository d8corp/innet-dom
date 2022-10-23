'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var History = require('@watch-state/history-api');
var innet = require('innet');
var watchState = require('watch-state');
var parseSearch = require('../../../utils/parseSearch/parseSearch.js');
var loop = require('../loop/loop.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var History__default = /*#__PURE__*/_interopDefaultLegacy(History);
var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

var history = new History__default["default"]();
var routerContext = new jsx.Context(1);
var parsedSearch = new watchState.Cache(function () { return parseSearch.parseSearch(history.search); });
var parsedPath = new watchState.Cache(function () { return history.path.split('/').map(function (e) { return e || '/'; }); }, true);
var pathDeep = new watchState.Cache(function () { return parsedPath.value.length; }, true);
var routes = [];
var routesIsh = [];
function getStrongRoute(handler, deep) {
    if (deep === void 0) { deep = routerContext.get(handler); }
    var routeIndex = deep - 1;
    if (!routes[routeIndex]) {
        routes[routeIndex] = new watchState.Cache(function () {
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
function getRoute(handler, deep) {
    if (deep === void 0) { deep = routerContext.get(handler); }
    var routeIndex = deep - 1;
    if (!routesIsh[routeIndex]) {
        routesIsh[routeIndex] = new watchState.Cache(function () { return parsedPath.value[deep] || '/'; }, true);
    }
    return routesIsh[routeIndex];
}
function renderSearchIsh(key, slots, handler) {
    var currentSlots = new watchState.Cache(function () {
        var result = parsedSearch.value[key];
        if (!result)
            return [];
        if (Array.isArray(result))
            return result;
        return [result];
    });
    return loop.loop({
        type: 'router-loop',
        props: { of: function () { return currentSlots.value; } },
        children: [function (_a) {
                var value = _a.value;
                return slots[value];
            }],
    }, handler);
}
function router(_a, handler) {
    var props = _a.props, children = _a.children;
    var slots = jsx.getSlots(handler, children);
    var deep = (props === null || props === void 0 ? void 0 : props.search) || routerContext.get(handler);
    var search = props && props.search;
    var ish = props && props.ish;
    if (search && ish) {
        return renderSearchIsh(String(search), slots, handler);
    }
    var slot = new watchState.Cache(function () {
        var route = search ? history.getSearch(String(search)) : ish ? getRoute(handler, deep).value : getStrongRoute(handler, deep).value;
        if (route && route in slots) {
            return slots[route];
        }
        return slots[''];
    });
    return innet__default["default"](function () {
        var currentSlot = slot.value;
        if (currentSlot !== slots['']) {
            return search ? currentSlot : {
                type: function () {
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
