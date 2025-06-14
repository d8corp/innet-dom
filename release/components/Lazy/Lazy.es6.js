import { jsx } from '@innet/jsx/jsx-runtime';
import { State, Watch } from 'watch-state';
import '../../utils/index.es6.js';
import { use } from '../../utils/use/use.es6.js';

function Lazy({ component, fallback, show = true, render = (Component) => jsx(Component, {}), loadedComponents = new Map(), }) {
    if (!show)
        return;
    const loading = new State(false);
    new Watch(() => {
        if (!use(show))
            return;
        const currentComponent = use(component);
        if (currentComponent instanceof Promise && !loadedComponents.has(currentComponent)) {
            loading.value = true;
            currentComponent.then((component) => {
                loadedComponents.set(currentComponent, typeof component === 'function' ? component : component.default);
                loading.value = false;
            });
        }
    });
    return () => {
        if (!use(show))
            return null;
        const currentComponent = use(component);
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

export { Lazy };
