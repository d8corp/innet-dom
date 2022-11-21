'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
require('../../handler/index.js');
require('../../utils/index.js');
var setParent = require('../../utils/setParent/setParent.js');
var handler = require('../../handler/handler.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function render(app, handler$1 = handler.handler) {
    const parent = document.createDocumentFragment();
    const childrenHandler = Object.create(handler$1);
    setParent.setParent(childrenHandler, parent);
    innet__default["default"](app, childrenHandler);
    return parent;
}

exports.render = render;
