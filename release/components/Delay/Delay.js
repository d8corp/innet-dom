'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var innet = require('innet');
var SyncTimer = require('sync-timer');
var watchState = require('watch-state');
require('../../utils/index.js');
var constants = require('../../utils/dom/constants.js');
var getComment = require('../../utils/getComment/getComment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);
var SyncTimer__default = /*#__PURE__*/_interopDefaultLegacy(SyncTimer);

const delayContext = new jsx.Context();
function useHidden() {
    return delayContext.get(innet.useHandler());
}
function Delay({ show = 0, hide = 0, ref, children }) {
    let handler = innet.useHandler();
    const run = () => { innet__default["default"](children, handler); };
    const [childHandler, comment] = getComment.getComment(handler, 'Delay', true);
    handler = childHandler;
    if (hide > 0) {
        const hideState = childHandler[delayContext.key] = new watchState.State(false);
        // @ts-expect-error TODO: fix types
        comment[constants.REMOVE_DELAY] = hide;
        if (ref) {
            ref.value = hideState;
        }
        const watcher = new watchState.Watch(() => {
            if (show > 0) {
                setTimeout(() => {
                    if (!hideState.value) {
                        watchState.scope.activeWatcher = watcher;
                        run();
                        watchState.scope.activeWatcher = undefined;
                    }
                }, show);
            }
            else {
                run();
            }
        }, true);
        watchState.onDestroy(() => {
            hideState.value = true;
            new SyncTimer__default["default"](() => { watcher.destroy(); }, hide);
        });
        return;
    }
    if (show > 0) {
        let destroyed = false;
        const { activeWatcher } = watchState.scope;
        watchState.onDestroy(() => {
            destroyed = true;
        });
        setTimeout(() => {
            if (!destroyed) {
                watchState.scope.activeWatcher = activeWatcher;
                run();
                watchState.scope.activeWatcher = undefined;
            }
        }, show);
        return;
    }
    run();
    return jsx.EMPTY;
}

exports.Delay = Delay;
exports.delayContext = delayContext;
exports.useHidden = useHidden;
