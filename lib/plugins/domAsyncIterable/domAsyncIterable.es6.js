import { __awaiter, __asyncValues } from 'tslib';
import innet from 'innet';
import { onDestroy } from 'watch-state';
import { clear } from '../../utils/dom/dom.es6.js';
import { useComment } from '../../utils/useComment/useComment.es6.js';

const domAsyncIterable = () => (apps, next, handler) => { var apps_1, apps_1_1; return __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const [childrenHandler, comment] = useComment(handler, 'asyncIterable');
    let update = false;
    let deleted = false;
    onDestroy(() => {
        deleted = true;
    });
    try {
        for (apps_1 = __asyncValues(apps); apps_1_1 = yield apps_1.next(), !apps_1_1.done;) {
            const app = apps_1_1.value;
            if (deleted)
                return;
            if (update) {
                clear(comment);
            }
            innet(app, childrenHandler);
            update = true;
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
