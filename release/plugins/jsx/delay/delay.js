'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var innet = require('innet');
var watchState = require('watch-state');
require('../../../utils/index.js');
var constants = require('../../../utils/dom/constants.js');
var getComment = require('../../../utils/getComment/getComment.js');
var setTimeoutSync = require('../../../utils/setTimeoutSync/setTimeoutSync.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const delayContext = new jsx.Context();
function useHidden() {
    return delayContext.get(jsx.useHandler());
}
function delay({ props, children }, handler) {
    const run = () => innet__default["default"](children, handler);
    if (props) {
        const { show, hide, ref } = props;
        const [childHandler, comment] = getComment.getComment(handler, 'delay', true);
        handler = childHandler;
        if (hide > 0) {
            const hideState = childHandler[delayContext.key] = new watchState.State(false);
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
                setTimeoutSync.setTimeoutSync(() => watcher.destroy(), hide);
            });
            return;
        }
        if (show > 0) {
            let destroyed = false;
            const { activeWatcher } = watchState.scope;
            watchState.onDestroy(() => {
                destroyed = true;
            });
            return setTimeout(() => {
                if (!destroyed) {
                    watchState.scope.activeWatcher = activeWatcher;
                    run();
                    watchState.scope.activeWatcher = undefined;
                }
            }, show);
        }
    }
    return run();
}

exports.delay = delay;
exports.delayContext = delayContext;
exports.useHidden = useHidden;
