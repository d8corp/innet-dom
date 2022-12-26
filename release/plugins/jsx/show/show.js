'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
require('../../../utils/index.js');
var inject = require('../../../utils/inject/inject.js');
var use = require('../../../utils/use/use.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function show({ props: { state }, children }, handler) {
    return innet__default["default"](inject.inject(state, state => use.use(state) ? children : null), handler);
}

exports.show = show;
