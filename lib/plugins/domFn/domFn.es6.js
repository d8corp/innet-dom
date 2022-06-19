import innet from 'innet';
import { Watch } from 'watch-state';
import { clear } from '../../utils/dom/dom.es6.js';
import { useComment } from '../../utils/useComment/useComment.es6.js';
import '@innet/jsx';

function domFn() {
    return (fn, next, handler) => {
        const [childrenHandler, comment] = useComment(handler, fn.name || 'watch');
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
