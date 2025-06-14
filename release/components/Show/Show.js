'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var inject = require('../../utils/inject/inject.js');

function Show({ when, children, fallback = null }) {
    return inject.inject(when, state => state ? children : fallback);
}

exports.Show = Show;
