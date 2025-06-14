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

const domAsyncIterable = () => () => {
    const handler = innet.useHandler();
    const apps = innet.useApp();
    const [childrenHandler, comment] = getComment.getComment(handler, 'asyncIterable');
    const { activeWatcher } = watchState.scope;
    let watcher;
    let deleted = false;
    watchState.onDestroy(() => {
        deleted = true;
    });
    const run = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, apps_1 = tslib.__asyncValues(apps), apps_1_1; apps_1_1 = yield apps_1.next(), _a = apps_1_1.done, !_a; _d = true) {
                _c = apps_1_1.value;
                _d = false;
                const app = _c;
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
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = apps_1.return)) yield _b.call(apps_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    run();
};

exports.domAsyncIterable = domAsyncIterable;
