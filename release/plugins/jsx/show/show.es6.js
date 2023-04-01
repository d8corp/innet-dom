import innet from 'innet';
import '../../../utils/index.es6.js';
import { inject } from '../../../utils/inject/inject.es6.js';

function show({ props: { when }, children }, handler) {
    return innet(inject(when, state => state ? children : null), handler);
}

export { show };
