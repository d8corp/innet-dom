'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../inject/index.js');
var inject = require('../inject/inject.js');

function injectPx(value) {
    return inject.inject(value, value => (typeof value === 'number'
        ? `${value}px`
        : Array.isArray(value)
            ? value.join('px ') + 'px'
            : ''));
}

exports.injectPx = injectPx;
