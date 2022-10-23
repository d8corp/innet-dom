'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var handler = require('../../handler/handler.js');
var setParent = require('../../utils/setParent/setParent.js');
require('watch-state');
require('tslib');
require('qs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function render(app, handler$1) {
    if (handler$1 === void 0) { handler$1 = handler.handler; }
    var parent = document.createDocumentFragment();
    var childrenHandler = Object.create(handler$1);
    setParent.setParent(childrenHandler, parent);
    innet__default["default"](app, childrenHandler);
    return parent;
}

exports.render = render;
