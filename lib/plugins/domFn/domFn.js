'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var innet = require('innet');
var watchState = require('watch-state');
var dom = require('../../utils/dom/dom.js');
var getComment = require('../../utils/getComment/getComment.js');
require('qs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function domFn() {
    return function (fn, next, handler) {
        var _a = tslib.__read(getComment.getComment(handler, fn.name || 'watch'), 2), childrenHandler = _a[0], comment = _a[1];
        var result;
        new watchState.Watch(function (update) {
            if (update) {
                dom.clear(comment);
            }
            result = innet__default["default"](fn(update), childrenHandler);
        });
        return result;
    };
}

exports.domFn = domFn;
