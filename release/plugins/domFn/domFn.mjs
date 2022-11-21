import innet from 'innet';
import { Watch } from 'watch-state';
import '../../utils/index.mjs';
import { getComment } from '../../utils/getComment/getComment.mjs';
import { clear } from '../../utils/dom/dom.mjs';

function domFn() {
    return (fn, next, handler) => {
        const [childrenHandler, comment] = getComment(handler, fn.name || 'watch');
        let result;
        new Watch(update => {
            if (update) {
                clear(comment);
            }
            result = innet(fn(update), childrenHandler);
        });
        return result;
    };
}

export { domFn };
