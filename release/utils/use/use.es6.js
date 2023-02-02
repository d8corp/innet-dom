import { State, Cache } from 'watch-state';

function use(prop, update = false) {
    if (prop instanceof State || prop instanceof Cache) {
        return prop.value;
    }
    return typeof prop === 'function' ? prop(update) : prop;
}

export { use };
