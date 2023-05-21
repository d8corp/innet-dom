'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
require('../../utils/index.js');
var getParent = require('../../utils/getParent/getParent.js');

function useParent() {
    return getParent.getParent(innet.useHandler());
}

exports.useParent = useParent;
