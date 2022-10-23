'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var setParent = require('../../../utils/setParent/setParent.js');
require('watch-state');
require('tslib');
require('qs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function portal(_a, handler) {
    var props = _a.props, children = _a.children;
    var childrenHandler = Object.create(handler);
    setParent.setParent(childrenHandler, props.parent);
    return innet__default["default"](children, childrenHandler);
}

exports.portal = portal;
