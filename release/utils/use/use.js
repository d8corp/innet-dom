'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');

function use(prop, update = false) {
    if (prop instanceof watchState.Observable) {
        return prop.value;
    }
    return typeof prop === 'function' ? prop(update) : prop;
}

exports.use = use;
