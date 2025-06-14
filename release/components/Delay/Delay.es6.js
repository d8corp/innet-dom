import { Context, EMPTY } from '@innet/jsx';
import innet, { useHandler } from 'innet';
import SyncTimer from 'sync-timer';
import { State, Watch, scope, onDestroy } from 'watch-state';
import '../../utils/index.es6.js';
import { REMOVE_DELAY } from '../../utils/dom/constants.es6.js';
import { getComment } from '../../utils/getComment/getComment.es6.js';

const delayContext = new Context();
function useHidden() {
    return delayContext.get(useHandler());
}
function Delay({ show = 0, hide = 0, ref, children }) {
    let handler = useHandler();
    const run = () => { innet(children, handler); };
    const [childHandler, comment] = getComment(handler, 'Delay', true);
    handler = childHandler;
    if (hide > 0) {
        const hideState = childHandler[delayContext.key] = new State(false);
        // @ts-expect-error TODO: fix types
        comment[REMOVE_DELAY] = hide;
        if (ref) {
            ref.value = hideState;
        }
        const watcher = new Watch(() => {
            if (show > 0) {
                setTimeout(() => {
                    if (!hideState.value) {
                        scope.activeWatcher = watcher;
                        run();
                        scope.activeWatcher = undefined;
                    }
                }, show);
            }
            else {
                run();
            }
        }, true);
        onDestroy(() => {
            hideState.value = true;
            new SyncTimer(() => { watcher.destroy(); }, hide);
        });
        return;
    }
    if (show > 0) {
        let destroyed = false;
        const { activeWatcher } = scope;
        onDestroy(() => {
            destroyed = true;
        });
        setTimeout(() => {
            if (!destroyed) {
                scope.activeWatcher = activeWatcher;
                run();
                scope.activeWatcher = undefined;
            }
        }, show);
        return;
    }
    run();
    return EMPTY;
}

export { Delay, delayContext, useHidden };
