import { LAZY } from '../../constants.es6.js';

function lazy(fn) {
    let promise;
    const lazyFn = () => {
        if (promise)
            return promise;
        promise = fn();
        return promise;
    };
    lazyFn[LAZY] = fn;
    return lazyFn;
}

export { lazy };
