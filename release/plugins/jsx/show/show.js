'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
require('../../../utils/index.js');
var use = require('../../../utils/use/use.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function show({ props: { state }, children }, handler) {
    const value = state instanceof watchState.State || state instanceof watchState.Cache ? () => state.value : state;
    return innet__default["default"](() => use.use(value) ? children : null, handler);
}

exports.show = show;
