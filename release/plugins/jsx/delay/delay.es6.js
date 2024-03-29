import { Context } from '@innet/jsx';
import innet, { useHandler, useApp } from 'innet';
import SyncTimer from 'sync-timer';
import { State, Watch, scope, onDestroy } from 'watch-state';
import '../../../utils/index.es6.js';
import { REMOVE_DELAY } from '../../../utils/dom/constants.es6.js';
import { getComment } from '../../../utils/getComment/getComment.es6.js';

const delayContext = new Context();
function useHidden() {
    return delayContext.get(useHandler());
}
function delay() {
    const { props, children } = useApp();
    let handler = useHandler();
    const run = () => {
        innet(children, handler);
    };
    if (props) {
        const { show, hide, ref } = props;
        const [childHandler, comment] = getComment(handler, 'delay', true);
        handler = childHandler;
        if (hide > 0) {
            const hideState = childHandler[delayContext.key] = new State(false);
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
    }
    run();
}

export { delay, delayContext, useHidden };
