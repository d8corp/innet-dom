'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/dom/index.js');
require('../../utils/getParent/index.js');
var getParent = require('../../utils/getParent/getParent.js');
var dom = require('../../utils/dom/dom.js');

function domNode() {
    return (node, next, handler) => {
        const parent = getParent.getParent(handler);
        dom.append(parent, node);
        return parent;
    };
}

exports.domNode = domNode;
