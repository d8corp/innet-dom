'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
require('../../../utils/index.js');
var getComment = require('../../../utils/getComment/getComment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function portal({ props, children }, handler) {
    const [childHandler] = getComment.getComment(handler, 'portal', false, props.parent);
    return innet__default["default"](children, childHandler);
}

exports.portal = portal;
