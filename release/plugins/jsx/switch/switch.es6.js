import { getSlots } from '@innet/jsx';
import innet from 'innet';
import '../../../utils/index.es6.js';
import { inject } from '../../../utils/inject/inject.es6.js';

function switchPlugin({ props: { of }, children }, handler) {
    const slots = getSlots(handler, children);
    return innet(inject(of, state => { var _a; return (_a = slots[state]) !== null && _a !== void 0 ? _a : slots['']; }), handler);
}

export { switchPlugin };
