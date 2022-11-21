'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var utils = require('@innet/utils');
var innet = require('innet');
require('../plugins/index.js');
var portal = require('../plugins/jsx/portal/portal.js');
var loop = require('../plugins/jsx/loop/loop.js');
var router = require('../plugins/jsx/router/router.js');
var link = require('../plugins/jsx/link/link.js');
var delay = require('../plugins/jsx/delay/delay.js');
var domJSX = require('../plugins/domJSX/domJSX.js');
var domAsyncIterable = require('../plugins/domAsyncIterable/domAsyncIterable.js');
var domIterable = require('../plugins/domIterable/domIterable.js');
var domFn = require('../plugins/domFn/domFn.js');
var domText = require('../plugins/domText/domText.js');
var domNode = require('../plugins/domNode/domNode.js');
var domAsync = require('../plugins/domAsync/domAsync.js');

const arrayPlugins = [
    utils.arraySync,
];
const JSXPlugins = {
    context: jsx.context,
    portal: portal.portal,
    for: loop.loop,
    slots: jsx.slots,
    slot: jsx.slot,
    router: router.router,
    a: link.link,
    delay: delay.delay,
};
const objectPlugins = [
    jsx.jsxPlugins(JSXPlugins),
    jsx.jsxComponent,
    domJSX.domJSX,
    utils.asyncIterable([
        domAsyncIterable.domAsyncIterable,
    ]),
    utils.iterable([
        domIterable.domIterable,
    ]),
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
