'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsx = require('@innet/jsx');
var innet = require('innet');
var watchState = require('watch-state');
var constants = require('../../../utils/dom/constants.js');
var getComment = require('../../../utils/getComment/getComment.js');
var context = require('../context/context.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

var delayContext = new context.Context();
function useHidden() {
    return delayContext.get(jsx.useHandler());
}
function delay(_a, handler) {
    var props = _a.props, children = _a.children;
    var run = function () { return innet__default["default"](children, handler); };
    if (props) {
        var show_1 = props.show, hide_1 = props.hide, ref = props.ref;
        var _b = tslib.__read(getComment.getComment(handler, 'delay', true), 2), childHandler = _b[0], comment = _b[1];
        handler = childHandler;
        if (hide_1 > 0) {
            var hideState_1 = childHandler[delayContext.key] = new watchState.State(false);
            comment[constants.REMOVE_DELAY] = hide_1;
            if (ref) {
                ref.value = hideState_1;
            }
            var watcher_1 = new watchState.Watch(function () {
                if (show_1 > 0) {
                    setTimeout(function () {
                        if (!hideState_1.value) {
                            watchState.scope.activeWatcher = watcher_1;
                            run();
                            watchState.scope.activeWatcher = undefined;
                        }
                    }, show_1);
                }
                else {
                    run();
                }
            }, true);
            watchState.onDestroy(function () {
                hideState_1.value = true;
                setTimeout(function () { return watcher_1.destroy(); }, hide_1);
            });
            return;
        }
        if (show_1 > 0) {
            var destroyed_1 = false;
            var activeWatcher_1 = watchState.scope.activeWatcher;
            watchState.onDestroy(function () {
                destroyed_1 = true;
            });
            return setTimeout(function () {
                if (!destroyed_1) {
                    watchState.scope.activeWatcher = activeWatcher_1;
                    run();
                    watchState.scope.activeWatcher = undefined;
                }
            }, show_1);
        }
    }
    return run();
}

exports.delay = delay;
exports.delayContext = delayContext;
exports.useHidden = useHidden;
