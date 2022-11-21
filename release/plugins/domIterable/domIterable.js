'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const domIterable = () => (apps, next, handler) => {
    let update = false;
    let result;
    for (const app of apps) {
        if (update)
            break;
        result = innet__default["default"](app, handler);
        update = true;
    }
    return result;
};

exports.domIterable = domIterable;
