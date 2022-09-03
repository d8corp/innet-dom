import { __awaiter, __asyncValues } from 'tslib';
import innet from 'innet';
import { onDestroy, scope, Watch } from 'watch-state';
import { clear } from '../../utils/dom/dom.es6.js';
import { getComment } from '../../utils/getComment/getComment.es6.js';

const domAsyncIterable = () => (apps, next, handler) => { var apps_1, apps_1_1; return __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const [childrenHandler, comment] = getComment(handler, 'asyncIterable');
    const { activeWatcher } = scope;
    let watcher;
    let deleted = false;
    onDestroy(() => {
        deleted = true;
    });
    try {
        for (apps_1 = __asyncValues(apps); apps_1_1 = yield apps_1.next(), !apps_1_1.done;) {
            const app = apps_1_1.value;
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
            if (apps_1_1 && !apps_1_1.done && (_a = apps_1.return)) yield _a.call(apps_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return comment;
}); };

export { domAsyncIterable };
