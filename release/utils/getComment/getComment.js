'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../dom/index.js');
require('../getParent/index.js');
require('../setParent/index.js');
var setParent = require('../setParent/setParent.js');
var dom = require('../dom/dom.js');
var getParent = require('../getParent/getParent.js');

function getComment(handler, name, freeParent = false, parent = getParent.getParent(handler)) {
    const comment = document.createComment(name);
    const childHandler = Object.create(handler);
    setParent.setParent(childHandler, comment);
    dom.append(parent, comment);
    if (!freeParent) {
        watchState.onDestroy(() => { dom.remove(comment); });
    }
    return [childHandler, comment];
}

exports.getComment = getComment;
