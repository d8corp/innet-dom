'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsx = require('@innet/jsx');
var innet = require('innet');
var watchState = require('watch-state');
var constants = require('../../../utils/dom/constants.js');
var useComment = require('../../../utils/useComment/useComment.js');
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
        var show = props.show, hide_1 = props.hide;
        var _b = tslib.__read(useComment.useComment(handler, 'delay', true), 2), childHandler = _b[0], comment = _b[1];
        handler = childHandler;
        if (hide_1 > 0) {
            var hideState_1 = childHandler[delayContext.key] = new watchState.State(false);
            comment[constants.REMOVE_DELAY] = hide_1;
            run = function () {
                var result;
                var watcher = new watchState.Watch(function () {
                    result = innet__default["default"](children, handler);
                }, true);
                watchState.onDestroy(function () {
                    hideState_1.value = true;
                    setTimeout(function () { return watcher.destroy(); }, hide_1);
                });
                return result;
            };
        }
        if (show > 0) {
            return setTimeout(function () { return run(); }, show);
        }
    }
    return run();
}

exports.delay = delay;
exports.delayContext = delayContext;
exports.useHidden = useHidden;
