import innet, { useHandler, useApp } from 'innet';
import '../../../utils/index.es6.js';
import { inject } from '../../../utils/inject/inject.es6.js';

function show() {
    const handler = useHandler();
    const { props: { when }, children } = useApp();
    innet(inject(when, state => state ? children : null), handler);
}

export { show };
