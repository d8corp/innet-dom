'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var innet = require('innet');
var watchState = require('watch-state');
var dom = require('../../utils/dom/dom.js');
var useComment = require('../../utils/useComment/useComment.js');
require('@innet/jsx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

var domAsyncIterable = function () { return function (apps, next, handler) { var apps_1, apps_1_1; return tslib.__awaiter(void 0, void 0, void 0, function () {
    var _a, childrenHandler, comment, activeWatcher, watcher, deleted, _loop_1, state_1, e_1_1;
    var e_1, _b;
    return tslib.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = tslib.__read(useComment.useComment(handler, 'asyncIterable'), 2), childrenHandler = _a[0], comment = _a[1];
                activeWatcher = watchState.scope.activeWatcher;
                deleted = false;
                watchState.onDestroy(function () {
                    deleted = true;
                });
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, 7, 12]);
                _loop_1 = function () {
                    var app = apps_1_1.value;
                    if (deleted)
                        return { value: void 0 };
                    watchState.scope.activeWatcher = activeWatcher;
                    if (watcher) {
                        watcher.destroy();
                        dom.clear(comment);
                    }
                    watcher = new watchState.Watch(function (update) {
                        if (update) {
                            dom.clear(comment);
                        }
                        innet__default["default"](app, childrenHandler);
                    });
                    watchState.scope.activeWatcher = undefined;
                };
                apps_1 = tslib.__asyncValues(apps);
                _c.label = 2;
            case 2: return [4 /*yield*/, apps_1.next()];
            case 3:
                if (!(apps_1_1 = _c.sent(), !apps_1_1.done)) return [3 /*break*/, 5];
                state_1 = _loop_1();
                if (typeof state_1 === "object")
                    return [2 /*return*/, state_1.value];
                _c.label = 4;
            case 4: return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 12];
            case 6:
                e_1_1 = _c.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 7:
                _c.trys.push([7, , 10, 11]);
                if (!(apps_1_1 && !apps_1_1.done && (_b = apps_1.return))) return [3 /*break*/, 9];
                return [4 /*yield*/, _b.call(apps_1)];
            case 8:
                _c.sent();
                _c.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 11: return [7 /*endfinally*/];
            case 12: return [2 /*return*/, comment];
        }
    });
}); }; };

exports.domAsyncIterable = domAsyncIterable;
