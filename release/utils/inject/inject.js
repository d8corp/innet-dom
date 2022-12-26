'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../use/index.js');
var use = require('../use/use.js');

function inject(value, callback) {
    if (value instanceof watchState.State || value instanceof watchState.Cache || value instanceof Function) {
        return () => callback(use.use(value));
    }
    return callback(value);
}

exports.inject = inject;
