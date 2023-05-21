import innet, { useHandler, useApp } from 'innet';
import { onDestroy, scope } from 'watch-state';
import '../../utils/index.es6.js';
import { getComment } from '../../utils/getComment/getComment.es6.js';

function domAsync() {
    return () => {
        const handler = useHandler();
        const app = useApp();
        const [childHandler] = getComment(handler, 'async');
        let removed = false;
        onDestroy(() => {
            removed = true;
        });
        const { activeWatcher } = scope;
        app.then(data => {
            if (!removed) {
                scope.activeWatcher = activeWatcher;
                innet(data, childHandler);
                scope.activeWatcher = undefined;
            }
        });
    };
}

export { domAsync };
