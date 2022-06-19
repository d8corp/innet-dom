import { useHandler } from '@innet/jsx';
import innet from 'innet';
import { State, Watch, onDestroy } from 'watch-state';
import { REMOVE_DELAY } from '../../../utils/dom/constants.es6.js';
import { useComment } from '../../../utils/useComment/useComment.es6.js';
import { Context } from '../context/context.es6.js';

const delayContext = new Context();
function useHidden() {
    return delayContext.get(useHandler());
}
function delay({ props, children }, handler) {
    const run = () => innet(children, handler);
    if (props) {
        const { show, hide, ref } = props;
        const [childHandler, comment] = useComment(handler, 'delay', true);
        handler = childHandler;
        if (hide > 0) {
            const hideState = childHandler[delayContext.key] = new State(false);
            comment[REMOVE_DELAY] = hide;
            if (ref) {
                ref.value = hideState;
            }
            const watcher = new Watch(() => {
                if (show > 0) {
                    setTimeout(run, show);
                }
                else {
                    run();
                }
            }, true);
            onDestroy(() => {
                hideState.value = true;
                setTimeout(() => watcher.destroy(), hide);
            });
            return;
        }
        if (show > 0) {
            return setTimeout(run, show);
        }
    }
    return run();
}

export { delay, delayContext, useHidden };
