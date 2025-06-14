'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var inject = require('../../utils/inject/inject.js');

function Hide({ when, children, fallback = null }) {
    return inject.inject(when, state => state ? fallback : children);
}

exports.Hide = Hide;
