'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dom = require('../../utils/dom/dom.js');
var getParent = require('../../utils/getParent/getParent.js');

function domNode() {
    return function (node, next, handler) {
        var parent = getParent.getParent(handler);
        dom.append(parent, node);
        return parent;
    };
}

exports.domNode = domNode;
