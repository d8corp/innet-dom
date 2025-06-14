import '../../utils/index.es6.js';
import { inject } from '../../utils/inject/inject.es6.js';

function Show({ when, children, fallback = null }) {
    return inject(when, state => state ? children : fallback);
}

export { Show };
