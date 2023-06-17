'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');

const callFunction = () => () => {
    innet.useApp()();
};

exports.callFunction = callFunction;
