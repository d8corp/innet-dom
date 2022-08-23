'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var innet = require('innet');
var watchState = require('watch-state');
var useComment = require('../../utils/useComment/useComment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function domAsync() {
    return function (app, next, handler) {
        var _a = tslib.__read(useComment.useComment(handler, 'async'), 1), childHandler = _a[0];
        var removed = false;
        watchState.onDestroy(function () {
            removed = true;
        });
        var activeWatcher = watchState.scope.activeWatcher;
        return app.then(function (data) {
            if (!removed) {
                watchState.scope.activeWatcher = activeWatcher;
                var result = innet__default["default"](data, childHandler);
                watchState.scope.activeWatcher = undefined;
                return result;
            }
        });
    };
}

exports.domAsync = domAsync;
