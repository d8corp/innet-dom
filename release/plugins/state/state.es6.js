import innet, { useApp, NEXT, useHandler } from 'innet';
import { Observable } from 'watch-state';

function state() {
    return () => {
        const state = useApp();
        if (!(state instanceof Observable))
            return NEXT;
        innet(() => state.value, useHandler());
    };
}

export { state };
