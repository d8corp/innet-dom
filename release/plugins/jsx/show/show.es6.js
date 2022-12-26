import innet from 'innet';
import '../../../utils/index.es6.js';
import { inject } from '../../../utils/inject/inject.es6.js';
import { use } from '../../../utils/use/use.es6.js';

function show({ props: { state }, children }, handler) {
    return innet(inject(state, state => use(state) ? children : null), handler);
}

export { show };
