import { useSlots } from '@innet/jsx';
import innet, { useHandler, useApp } from 'innet';
import '../../../utils/index.es6.js';
import { inject } from '../../../utils/inject/inject.es6.js';

function switchPlugin() {
    const handler = useHandler();
    const { props: { of } } = useApp();
    const slots = useSlots();
    innet(inject(of, state => { var _a; return (_a = slots[state]) !== null && _a !== void 0 ? _a : slots['']; }), handler);
}

export { switchPlugin };
