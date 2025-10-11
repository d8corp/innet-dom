import '../inject/index.es6.js';
import { inject } from '../inject/inject.es6.js';

function injectPx(value) {
    return inject(value, value => (typeof value === 'number'
        ? `${value}px`
        : Array.isArray(value)
            ? value.join('px ') + 'px'
            : ''));
}

export { injectPx };
