'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
require('../plugins/callFunction/index.js');
var callFunction = require('../plugins/callFunction/callFunction.js');

const callFunctionHandler = innet.createHandler([callFunction.callFunction]);

exports.callFunctionHandler = callFunctionHandler;
