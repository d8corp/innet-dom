import innet from 'innet';
import { onDestroy, scope } from 'watch-state';
import '../../utils/index.es6.js';
import { getComment } from '../../utils/getComment/getComment.es6.js';

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
