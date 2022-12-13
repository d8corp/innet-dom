import innet from 'innet';
import { State, Cache } from 'watch-state';
import '../../../utils/index.es6.js';
import { use } from '../../../utils/use/use.es6.js';

function show({ props: { state }, children }, handler) {
    const value = state instanceof State || state instanceof Cache ? () => state.value : state;
    return innet(() => use(value) ? children : null, handler);
}

export { show };
