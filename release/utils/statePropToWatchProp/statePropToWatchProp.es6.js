import { Observable } from 'watch-state';

function statePropToWatchProp(value) {
    if (value instanceof Observable) {
        return () => value.value;
    }
    return value;
}

export { statePropToWatchProp };
