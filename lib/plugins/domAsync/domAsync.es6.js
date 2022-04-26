import innet from 'innet';
import { onDestroy } from 'watch-state';
import { useComment } from '../../utils/useComment/useComment.es6.js';

function domAsync() {
    return (app, next, handler) => {
        const [childHandler] = useComment(handler, 'async');
        let removed = false;
        onDestroy(() => {
            removed = true;
        });
        return app.then(data => {
            if (!removed) {
                return innet(data, childHandler);
            }
        });
    };
}

export { domAsync };
