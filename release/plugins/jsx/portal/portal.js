'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
require('../../../utils/index.js');
var setParent = require('../../../utils/setParent/setParent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function portal({ props, children }, handler) {
    const childrenHandler = Object.create(handler);
    setParent.setParent(childrenHandler, props.parent);
    return innet__default["default"](children, childrenHandler);
}

exports.portal = portal;
