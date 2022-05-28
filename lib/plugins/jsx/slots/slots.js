'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var context = require('../context/context.js');
var slot = require('../slot/slot.js');
var constants = require('./constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function slots(_a, handler) {
    var from = _a.props.from, children = _a.children;
    return innet__default["default"](children, context.createContextHandler(handler, constants.slotsContext, slot.getSlots(handler, from)));
}

exports.slots = slots;
