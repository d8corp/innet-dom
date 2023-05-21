import { Observable } from 'watch-state';

function use(prop, update = false) {
    if (prop instanceof Observable) {
        return prop.value;
    }
    return typeof prop === 'function' ? prop(update) : prop;
}

export { use };
