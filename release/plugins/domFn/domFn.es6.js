import innet, { useApp, useHandler } from 'innet';
import { Watch } from 'watch-state';
import '../../utils/index.es6.js';
import { getComment } from '../../utils/getComment/getComment.es6.js';
import { clear } from '../../utils/dom/dom.es6.js';

function domFn() {
    return () => {
        const fn = useApp();
        const handler = useHandler();
        const [childrenHandler, comment] = getComment(handler, fn.name || 'watch');
        new Watch(update => {
            if (update) {
                clear(comment);
            }
            innet(fn(update), childrenHandler);
        });
    };
}

export { domFn };
