import { __awaiter, __asyncValues } from 'tslib';
import innet from 'innet';
import { scope, onDestroy, Watch } from 'watch-state';
import '../../utils/index.mjs';
import { getComment } from '../../utils/getComment/getComment.mjs';
import { clear } from '../../utils/dom/dom.mjs';

const domAsyncIterable = () => (apps, next, handler) => { var _a, apps_1, apps_1_1; return __awaiter(void 0, void 0, void 0, function* () {
    var _b, e_1, _c, _d;
    const [childrenHandler, comment] = getComment(handler, 'asyncIterable');
    const { activeWatcher } = scope;
    let watcher;
    let deleted = false;
    onDestroy(() => {
        deleted = true;
    });
    try {
        for (_a = true, apps_1 = __asyncValues(apps); apps_1_1 = yield apps_1.next(), _b = apps_1_1.done, !_b;) {
            _d = apps_1_1.value;
            _a = false;
            try {
                const app = _d;
                if (deleted)
                    return;
                scope.activeWatcher = activeWatcher;
                if (watcher) {
                    watcher.destroy();
                    clear(comment);
                }
                watcher = new Watch(update => {
                    if (update) {
                        clear(comment);
                    }
                    innet(app, childrenHandler);
                });
                scope.activeWatcher = undefined;
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

export { domAsyncIterable };
