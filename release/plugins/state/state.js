'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function state() {
    return () => {
        const state = innet.useApp();
        if (!(state instanceof watchState.Observable))
            return innet.NEXT;
        innet__default["default"](() => state.value, innet.useHandler());
    };
}

exports.state = state;
