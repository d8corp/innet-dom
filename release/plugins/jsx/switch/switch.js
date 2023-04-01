'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var innet = require('innet');
require('../../../utils/index.js');
var inject = require('../../../utils/inject/inject.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function switchPlugin({ props: { of }, children }, handler) {
    const slots = jsx.getSlots(handler, children);
    return innet__default["default"](inject.inject(of, state => { var _a; return (_a = slots[state]) !== null && _a !== void 0 ? _a : slots['']; }), handler);
}

exports.switchPlugin = switchPlugin;
