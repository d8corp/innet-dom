import { __awaiter, __asyncValues } from 'tslib';
import innet, { useHandler, useApp } from 'innet';
import { scope, onDestroy, Watch } from 'watch-state';
import '../../utils/index.es6.js';
import { getComment } from '../../utils/getComment/getComment.es6.js';
import { clear } from '../../utils/dom/dom.es6.js';

const domAsyncIterable = () => () => {
    const handler = useHandler();
    const apps = useApp();
    const [childrenHandler, comment] = getComment(handler, 'asyncIterable');
    const { activeWatcher } = scope;
    let watcher;
    let deleted = false;
    onDestroy(() => {
        deleted = true;
    });
    const run = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, apps_1 = __asyncValues(apps), apps_1_1; apps_1_1 = yield apps_1.next(), _a = apps_1_1.done, !_a; _d = true) {
                _c = apps_1_1.value;
                _d = false;
                const app = _c;
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

export { domAsyncIterable };
