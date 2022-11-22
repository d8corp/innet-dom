'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function use(prop, update = false) {
    // @ts-expect-error
    return typeof prop === 'function' ? prop(update) : prop;
}

exports.use = use;
