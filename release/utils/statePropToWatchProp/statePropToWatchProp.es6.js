import { State, Cache } from 'watch-state';

function statePropToWatchProp(value) {
    if (value instanceof State || value instanceof Cache) {
        const oldValue = value;
        return () => oldValue.value;
    }
    return value;
}

export { statePropToWatchProp };
