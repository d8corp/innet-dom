'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var innet = require('innet');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

var domIterable = function () { return function (apps, next, handler) {
    var e_1, _a;
    var update = false;
    var result;
    try {
        for (var apps_1 = tslib.__values(apps), apps_1_1 = apps_1.next(); !apps_1_1.done; apps_1_1 = apps_1.next()) {
            var app = apps_1_1.value;
            if (update)
                break;
            result = innet__default["default"](app, handler);
            update = true;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (apps_1_1 && !apps_1_1.done && (_a = apps_1.return)) _a.call(apps_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}; };

exports.domIterable = domIterable;
