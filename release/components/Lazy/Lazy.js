'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('@innet/jsx/jsx-runtime');
var watchState = require('watch-state');
require('../../utils/index.js');
var use = require('../../utils/use/use.js');

function Lazy({ component, fallback, show = true, render = (Component) => jsxRuntime.jsx(Component, {}), loadedComponents = new Map(), }) {
    if (!show)
        return;
    const loading = new watchState.State(false);
    new watchState.Watch(() => {
        if (!use.use(show))
            return;
        const currentComponent = use.use(component);
        if (currentComponent instanceof Promise && !loadedComponents.has(currentComponent)) {
            loading.value = true;
            currentComponent.then((component) => {
                loadedComponents.set(currentComponent, typeof component === 'function' ? component : component.default);
                loading.value = false;
            });
        }
    });
    return () => {
        if (!use.use(show))
            return null;
        const currentComponent = use.use(component);
        if (typeof currentComponent === 'function')
            return render(currentComponent);
        const loadedComponent = loadedComponents.get(currentComponent);
        if (loadedComponent) {
            return render(loadedComponent);
        }
        if (loading.value)
            return fallback;
        throw Error('Error in Lazy component. component has wrong result of promise.');
    };
}

exports.Lazy = Lazy;
