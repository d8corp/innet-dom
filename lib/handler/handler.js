'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var utils = require('@innet/utils');
var innet = require('innet');
var loop = require('../plugins/jsx/loop/loop.js');
var portal = require('../plugins/jsx/portal/portal.js');
var context = require('../plugins/jsx/context/context.js');
var domAsync = require('../plugins/domAsync/domAsync.js');
var domIterable = require('../plugins/domIterable/domIterable.js');
var domJSX = require('../plugins/domJSX/domJSX.js');
var domNode = require('../plugins/domNode/domNode.js');
var domFn = require('../plugins/domFn/domFn.js');
var domText = require('../plugins/domText/domText.js');
var domAsyncIterable = require('../plugins/domAsyncIterable/domAsyncIterable.js');

var arrayPlugins = [
    utils.arraySync,
];
var JSXPlugins = {
    context: context.context,
    portal: portal.portal,
    for: loop.loop,
};
var objectPlugins = [
    jsx.jsxPlugins(JSXPlugins),
    jsx.jsxTemplate,
    domJSX.domJSX,
    utils.asyncIterable([
        domAsyncIterable.domAsyncIterable,
    ]),
    utils.iterable([
        domIterable.domIterable,
    ]),
];
var fnPlugins = [
    domFn.domFn,
];
var stringPlugins = [
    domText.domText,
];
var numberPlugins = [
    domText.domText,
];
var nodePlugins = [
    domNode.domNode,
];
var promisePlugins = [
    domAsync.domAsync,
];
var handler = innet.createHandler([
    utils.nullish([utils.stop]),
    utils.promise(promisePlugins),
    utils.node(nodePlugins),
    utils.fn(fnPlugins),
    utils.string(stringPlugins),
    utils.number(numberPlugins),
    utils.array(arrayPlugins),
    utils.object(objectPlugins),
]);

exports.JSXPlugins = JSXPlugins;
exports.arrayPlugins = arrayPlugins;
exports.fnPlugins = fnPlugins;
exports.handler = handler;
exports.nodePlugins = nodePlugins;
exports.numberPlugins = numberPlugins;
exports.objectPlugins = objectPlugins;
exports.promisePlugins = promisePlugins;
exports.stringPlugins = stringPlugins;
