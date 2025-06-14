'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

function lazy(fn) {
    let promise;
    const lazyFn = () => {
        if (promise)
            return promise;
        promise = fn();
        return promise;
    };
    lazyFn[constants.LAZY] = fn;
    return lazyFn;
}

exports.lazy = lazy;
