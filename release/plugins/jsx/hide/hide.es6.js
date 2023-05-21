import innet, { useApp, useHandler } from 'innet';
import '../../../utils/index.es6.js';
import { inject } from '../../../utils/inject/inject.es6.js';
import { use } from '../../../utils/use/use.es6.js';

function hide() {
    const { props: { when }, children } = useApp();
    const handler = useHandler();
    innet(inject(when, state => use(state) ? null : children), handler);
}

export { hide };
