import innet from 'innet';
import { State, Cache } from 'watch-state';

function state() {
    return (state, next, handler) => {
        if (state instanceof State || state instanceof Cache) {
            return innet(() => state.value, handler);
        }
        return next();
    };
}

export { state };
