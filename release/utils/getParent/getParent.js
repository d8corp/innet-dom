'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

function getParent(handler) {
    return handler[constants.PARENT] || document.body;
}

exports.getParent = getParent;
