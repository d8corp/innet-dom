'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');

function use(prop, update = false) {
    if (prop instanceof watchState.State || prop instanceof watchState.Cache) {
        return prop.value;
    }
    // @ts-expect-error
    return typeof prop === 'function' ? prop(update) : prop;
}

exports.use = use;
