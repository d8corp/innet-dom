'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

function setParent(handler, parent) {
    handler[constants.PARENT] = parent;
}

exports.setParent = setParent;
