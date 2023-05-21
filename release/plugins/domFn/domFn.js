'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
require('../../utils/index.js');
var getComment = require('../../utils/getComment/getComment.js');
var dom = require('../../utils/dom/dom.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function domFn() {
    return () => {
        const fn = innet.useApp();
        const handler = innet.useHandler();
        const [childrenHandler, comment] = getComment.getComment(handler, fn.name || 'watch');
        new watchState.Watch(update => {
            if (update) {
                dom.clear(comment);
            }
            innet__default["default"](fn(update), childrenHandler);
        });
    };
}

exports.domFn = domFn;
