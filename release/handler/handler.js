'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var utils = require('@innet/utils');
var innet = require('innet');
require('../plugins/index.js');
var state = require('../plugins/state/state.js');
var domJSX = require('../plugins/domJSX/domJSX.js');
var domIterable = require('../plugins/domIterable/domIterable.js');
var domFn = require('../plugins/domFn/domFn.js');
var domText = require('../plugins/domText/domText.js');
var domNode = require('../plugins/domNode/domNode.js');
var domAsync = require('../plugins/domAsync/domAsync.js');

const arrayPlugins = [
    utils.arraySync,
];
const objectPlugins = [
    state.state,
    jsx.jsxComponent,
    domJSX.domJSX,
    domIterable.domIterable,
];
const fnPlugins = [
    domFn.domFn,
];
const stringPlugins = [
    domText.domText,
];
const numberPlugins = [
    domText.domText,
];
const nodePlugins = [
    domNode.domNode,
];
const promisePlugins = [
    domAsync.domAsync,
];
const handler = innet.createHandler([
    utils.nullish([]),
    utils.promise(promisePlugins),
    utils.node(nodePlugins),
    utils.fn(fnPlugins),
    utils.string(stringPlugins),
    utils.number(numberPlugins),
    utils.array(arrayPlugins),
    utils.object(objectPlugins),
]);

exports.arrayPlugins = arrayPlugins;
exports.fnPlugins = fnPlugins;
exports.handler = handler;
exports.nodePlugins = nodePlugins;
exports.numberPlugins = numberPlugins;
exports.objectPlugins = objectPlugins;
exports.promisePlugins = promisePlugins;
exports.stringPlugins = stringPlugins;
