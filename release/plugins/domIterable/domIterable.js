'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const domIterable = () => () => {
    const apps = innet.useApp();
    const handler = innet.useHandler();
    let update = false;
    for (const app of apps) {
        if (update)
            break;
        innet__default["default"](app, handler);
        update = true;
    }
};

exports.domIterable = domIterable;
