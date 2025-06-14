'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

function isLazy(value) {
    return constants.LAZY in value;
}

exports.isLazy = isLazy;
