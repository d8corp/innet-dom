'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
require('../../hooks/index.js');
require('../../utils/index.js');
var dom = require('../../utils/dom/dom.js');
var useParent = require('../../hooks/useParent/useParent.js');

function domNode() {
    return () => {
        dom.append(useParent.useParent(), innet.useApp());
    };
}

exports.domNode = domNode;
