import { jsx } from '@innet/jsx/jsx-runtime';
import { useContext, ContextProvider } from '@innet/jsx';
import { locationPath } from '@watch-state/history-api';
import { State, Cache } from 'watch-state';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import '../Lazy/index.es6.js';
import '../Pipe/index.es6.js';
import { findRoute } from './helpers/findRoute.es6.js';
import { paramsContext } from '../../hooks/useParams/useParams.es6.js';
import { use } from '../../utils/use/use.es6.js';
import { isLazy } from '../../utils/isLazy/isLazy.es6.js';
import { Pipe } from '../Pipe/Pipe.es6.js';
import { Lazy } from '../Lazy/Lazy.es6.js';

const EMPTY_SET = new Set();
function Router({ routing, permissions = EMPTY_SET }) {
    const params = useContext(paramsContext) || new State({});
    const route = new Cache(() => {
        const newParams = {};
        const route = findRoute(use(routing), locationPath.value.split('/').filter(Boolean), newParams, use(permissions));
        params.value = newParams;
        return route;
    });
    const components = new Cache(() => {
        const routeValue = route.value;
        if (!routeValue)
            return [];
        const result = [];
        for (let i = 0; i < routeValue.components.length; i++) {
            const component = routeValue.components[i];
            result.push(isLazy(component) ? component() : component);
        }
        return result;
    });
    const loadedComponents = new Map();
    return (jsx(ContextProvider, { for: paramsContext, set: params, children: jsx(Pipe, { children: (children, index) => (jsx(Lazy, { component: new Cache(() => components.value[index]), fallback: new Cache(() => { var _a, _b; return (_b = (_a = route.value) === null || _a === void 0 ? void 0 : _a.fallback) === null || _b === void 0 ? void 0 : _b[index]; }), show: new Cache(() => components.value.length > index), render: (Component) => jsx(Component, { children: children }), loadedComponents: loadedComponents })) }) }));
}

export { Router };
