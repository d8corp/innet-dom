'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function domText() {
    return () => {
        innet__default["default"](document.createTextNode(innet.useApp()), innet.useHandler());
    };
}

exports.domText = domText;
