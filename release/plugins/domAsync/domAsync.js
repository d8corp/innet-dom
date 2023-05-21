'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
require('../../utils/index.js');
var getComment = require('../../utils/getComment/getComment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function domAsync() {
    return () => {
        const handler = innet.useHandler();
        const app = innet.useApp();
        const [childHandler] = getComment.getComment(handler, 'async');
        let removed = false;
        watchState.onDestroy(() => {
            removed = true;
        });
        const { activeWatcher } = watchState.scope;
        app.then(data => {
            if (!removed) {
                watchState.scope.activeWatcher = activeWatcher;
                innet__default["default"](data, childHandler);
                watchState.scope.activeWatcher = undefined;
            }
        });
    };
}

exports.domAsync = domAsync;
