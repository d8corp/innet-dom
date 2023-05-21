'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
require('../../../utils/index.js');
var inject = require('../../../utils/inject/inject.js');
var use = require('../../../utils/use/use.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function hide() {
    const { props: { when }, children } = innet.useApp();
    const handler = innet.useHandler();
    innet__default["default"](inject.inject(when, state => use.use(state) ? null : children), handler);
}

exports.hide = hide;
