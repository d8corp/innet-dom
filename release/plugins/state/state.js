'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function state() {
    return (state, next, handler) => {
        if (state instanceof watchState.State || state instanceof watchState.Cache) {
            return innet__default["default"](() => state.value, handler);
        }
        return next();
    };
}

exports.state = state;
