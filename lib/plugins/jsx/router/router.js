'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var History = require('@watch-state/history-api');
var innet = require('innet');
var watchState = require('watch-state');
var context = require('../context/context.js');
var slot = require('../slot/slot.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var History__default = /*#__PURE__*/_interopDefaultLegacy(History);
var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

var history = new History__default["default"]();
var routerContext = new context.Context(1);
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
function getRoute(handler, deep) {
    if (deep === void 0) { deep = routerContext.get(handler); }
    var routeIndex = deep - 1;
    if (!routesIsh[routeIndex]) {
        routesIsh[routeIndex] = new watchState.Cache(function () { return parsedPath.value[deep] || '/'; }, true);
    }
    return routesIsh[routeIndex];
}
function router(_a, handler) {
    var props = _a.props, children = _a.children;
    var slots = slot.getSlots(handler, children);
    var deep = (props === null || props === void 0 ? void 0 : props.search) || routerContext.get(handler);
    var search = props && props.search;
    var ish = props && props.ish;
    return innet__default["default"](function () {
        var route = search ? history.search(String(search)) : ish ? getRoute(handler, deep).value : getStrongRoute(handler, deep).value;
        if (route && route in slots) {
            return search ? slots[route] : {
                type: function (_, __, handler) {
                    innet__default["default"](slots[route], context.createContextHandler(handler, routerContext, deep + 1));
                },
            };
        }
        return slots[''];
    }, handler);
}

exports.getRoute = getRoute;
exports.getStrongRoute = getStrongRoute;
exports.history = history;
exports.parsedPath = parsedPath;
exports.pathDeep = pathDeep;
exports.router = router;
exports.routerContext = routerContext;
exports.routes = routes;
exports.routesIsh = routesIsh;
