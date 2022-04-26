import { jsxPlugins, jsxTemplate } from '@innet/jsx';
import { asyncIterable, iterable, nullish, stop, promise, node, fn, string, number, array, object, arraySync } from '@innet/utils';
import { createHandler } from 'innet';
import { loop } from '../plugins/jsx/loop/loop.es6.js';
import { portal } from '../plugins/jsx/portal/portal.es6.js';
import { context } from '../plugins/jsx/context/context.es6.js';
import { domAsync } from '../plugins/domAsync/domAsync.es6.js';
import { domIterable } from '../plugins/domIterable/domIterable.es6.js';
import { domJSX } from '../plugins/domJSX/domJSX.es6.js';
import { domNode } from '../plugins/domNode/domNode.es6.js';
import { domFn } from '../plugins/domFn/domFn.es6.js';
import { domText } from '../plugins/domText/domText.es6.js';
import { domAsyncIterable } from '../plugins/domAsyncIterable/domAsyncIterable.es6.js';

const arrayPlugins = [
    arraySync,
];
const JSXPlugins = {
    context,
    portal,
    for: loop,
};
const objectPlugins = [
    jsxPlugins(JSXPlugins),
    jsxTemplate,
    domJSX,
    asyncIterable([
        domAsyncIterable,
    ]),
    iterable([
        domIterable,
    ]),
];
const fnPlugins = [
    domFn,
];
const stringPlugins = [
    domText,
];
const numberPlugins = [
    domText,
];
const nodePlugins = [
    domNode,
];
const promisePlugins = [
    domAsync,
];
const handler = createHandler([
    nullish([stop]),
    promise(promisePlugins),
    node(nodePlugins),
    fn(fnPlugins),
    string(stringPlugins),
    number(numberPlugins),
    array(arrayPlugins),
    object(objectPlugins),
]);

export { JSXPlugins, arrayPlugins, fnPlugins, handler, nodePlugins, numberPlugins, objectPlugins, promisePlugins, stringPlugins };
