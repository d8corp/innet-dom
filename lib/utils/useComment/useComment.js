'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
var dom = require('../dom/dom.js');
var getParent = require('../getParent/getParent.js');
var setParent = require('../setParent/setParent.js');

function useComment(handler, name, freeParent) {
    if (freeParent === void 0) { freeParent = false; }
    var comment = document.createComment(name);
    var parent = getParent.getParent(handler);
    var childHandler = Object.create(handler);
    setParent.setParent(childHandler, comment);
    dom.append(parent, comment);
    if (!freeParent) {
        watchState.onDestroy(function () { return dom.remove(comment); });
    }
    return [childHandler, comment];
}

exports.useComment = useComment;
