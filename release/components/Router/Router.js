'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('@innet/jsx/jsx-runtime');
var jsx = require('@innet/jsx');
var historyApi = require('@watch-state/history-api');
var watchState = require('watch-state');
require('../../hooks/index.js');
require('../../utils/index.js');
require('../Lazy/index.js');
require('../Pipe/index.js');
var findRoute = require('./helpers/findRoute.js');
var useParams = require('../../hooks/useParams/useParams.js');
var use = require('../../utils/use/use.js');
var isLazy = require('../../utils/isLazy/isLazy.js');
var Pipe = require('../Pipe/Pipe.js');
var Lazy = require('../Lazy/Lazy.js');

const EMPTY_SET = new Set();
function Router({ routing, permissions = EMPTY_SET }) {
    const params = jsx.useContext(useParams.paramsContext) || new watchState.State({});
    const route = new watchState.Cache(() => {
        const newParams = {};
        const route = findRoute.findRoute(use.use(routing), historyApi.locationPath.value.split('/').filter(Boolean), newParams, use.use(permissions));
        params.value = newParams;
        return route;
    });
    const components = new watchState.Cache(() => {
        const routeValue = route.value;
        if (!routeValue)
            return [];
        const result = [];
        for (let i = 0; i < routeValue.components.length; i++) {
            const component = routeValue.components[i];
            result.push(isLazy.isLazy(component) ? component() : component);
        }
        return result;
    });
    const loadedComponents = new Map();
    return (jsxRuntime.jsx(jsx.ContextProvider, { for: useParams.paramsContext, set: params, children: jsxRuntime.jsx(Pipe.Pipe, { children: (children, index) => (jsxRuntime.jsx(Lazy.Lazy, { component: new watchState.Cache(() => components.value[index]), fallback: new watchState.Cache(() => { var _a, _b; return (_b = (_a = route.value) === null || _a === void 0 ? void 0 : _a.fallback) === null || _b === void 0 ? void 0 : _b[index]; }), show: new watchState.Cache(() => components.value.length > index), render: (Component) => jsxRuntime.jsx(Component, { children: children }), loadedComponents: loadedComponents })) }) }));
}

exports.Router = Router;
