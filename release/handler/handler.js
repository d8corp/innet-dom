'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var utils = require('@innet/utils');
var innet = require('innet');
require('../plugins/index.js');
var portal = require('../plugins/jsx/portal/portal.js');
var map = require('../plugins/jsx/map/map.js');
var router = require('../plugins/jsx/router/router.js');
var link = require('../plugins/jsx/link/link.js');
var delay = require('../plugins/jsx/delay/delay.js');
var show = require('../plugins/jsx/show/show.js');
var hide = require('../plugins/jsx/hide/hide.js');
var _switch = require('../plugins/jsx/switch/switch.js');
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
const JSXPlugins = {
    context: jsx.context,
    portal: portal.portal,
    map: map.map,
    slots: jsx.slots,
    slot: jsx.slot,
    router: router.router,
    a: link.link,
    delay: delay.delay,
    show: show.show,
    hide: hide.hide,
    switch: _switch.switchPlugin,
};
const objectPlugins = [
    state.state,
    jsx.jsxPlugins(JSXPlugins),
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

exports.JSXPlugins = JSXPlugins;
exports.arrayPlugins = arrayPlugins;
exports.fnPlugins = fnPlugins;
exports.handler = handler;
exports.nodePlugins = nodePlugins;
exports.numberPlugins = numberPlugins;
exports.objectPlugins = objectPlugins;
exports.promisePlugins = promisePlugins;
exports.stringPlugins = stringPlugins;
