import innet from 'innet';
import { onDestroy, scope } from 'watch-state';
import '../../utils/index.mjs';
import { getComment } from '../../utils/getComment/getComment.mjs';

function domAsync() {
    return (app, next, handler) => {
        const [childHandler] = getComment(handler, 'async');
        let removed = false;
        onDestroy(() => {
            removed = true;
        });
        const { activeWatcher } = scope;
        return app.then(data => {
            if (!removed) {
                scope.activeWatcher = activeWatcher;
                const result = innet(data, childHandler);
                scope.activeWatcher = undefined;
                return result;
            }
        });
    };
}

export { domAsync };
