'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var innet = require('innet');
require('../../utils/index.js');
var getComment = require('../../utils/getComment/getComment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function Portal({ parent, children }) {
    const handler = innet.useHandler();
    const [childHandler] = getComment.getComment(handler, 'portal', false, parent);
    innet__default["default"](children, childHandler);
    return jsx.EMPTY;
}

exports.Portal = Portal;
