'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../dom/index.js');
require('../getParent/index.js');
require('../setParent/index.js');
var getParent = require('../getParent/getParent.js');
var setParent = require('../setParent/setParent.js');
var dom = require('../dom/dom.js');

function getComment(handler, name, freeParent = false) {
    const comment = document.createComment(name);
    const parent = getParent.getParent(handler);
    const childHandler = Object.create(handler);
    setParent.setParent(childHandler, comment);
    dom.append(parent, comment);
    if (!freeParent) {
        watchState.onDestroy(() => dom.remove(comment));
    }
    return [childHandler, comment];
}

exports.getComment = getComment;
