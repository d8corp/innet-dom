import { State, Cache } from 'watch-state';

function statePropToWatchProp(value) {
    if (value instanceof State || value instanceof Cache) {
        return () => value.value;
    }
    return value;
}

export { statePropToWatchProp };
