'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var innet = require('innet');
var watchState = require('watch-state');
require('../../utils/index.js');
var getComment = require('../../utils/getComment/getComment.js');
var dom = require('../../utils/dom/dom.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const domAsyncIterable = () => (apps, next, handler) => { var _a, apps_1, apps_1_1; return tslib.__awaiter(void 0, void 0, void 0, function* () {
    var _b, e_1, _c, _d;
    const [childrenHandler, comment] = getComment.getComment(handler, 'asyncIterable');
    const { activeWatcher } = watchState.scope;
    let watcher;
    let deleted = false;
    watchState.onDestroy(() => {
        deleted = true;
    });
    try {
        for (_a = true, apps_1 = tslib.__asyncValues(apps); apps_1_1 = yield apps_1.next(), _b = apps_1_1.done, !_b;) {
            _d = apps_1_1.value;
            _a = false;
            try {
                const app = _d;
                if (deleted)
                    return;
                watchState.scope.activeWatcher = activeWatcher;
                if (watcher) {
                    watcher.destroy();
                    dom.clear(comment);
                }
                watcher = new watchState.Watch(update => {
                    if (update) {
                        dom.clear(comment);
                    }
                    innet__default["default"](app, childrenHandler);
                });
                watchState.scope.activeWatcher = undefined;
            }
            finally {
                _a = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_a && !_b && (_c = apps_1.return)) yield _c.call(apps_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return comment;
}); };

exports.domAsyncIterable = domAsyncIterable;
