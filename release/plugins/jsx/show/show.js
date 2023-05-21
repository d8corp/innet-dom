'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
require('../../../utils/index.js');
var inject = require('../../../utils/inject/inject.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function show() {
    const handler = innet.useHandler();
    const { props: { when }, children } = innet.useApp();
    innet__default["default"](inject.inject(when, state => state ? children : null), handler);
}

exports.show = show;
