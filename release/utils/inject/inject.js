'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../use/index.js');
var use = require('../use/use.js');

function inject(value, callback) {
    if (value instanceof watchState.Observable || value instanceof Function) {
        return update => callback(use.use(value, update));
    }
    return callback(value);
}

exports.inject = inject;
