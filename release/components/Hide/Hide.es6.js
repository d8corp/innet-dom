import '../../utils/index.es6.js';
import { inject } from '../../utils/inject/inject.es6.js';

function Hide({ when, children, fallback = null }) {
    return inject(when, state => state ? fallback : children);
}

export { Hide };
