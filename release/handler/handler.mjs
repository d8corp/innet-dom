import { context, slots, slot, jsxPlugins, jsxComponent } from '@innet/jsx';
import { arraySync, asyncIterable, iterable, nullish, stop, promise, node, fn, string, number, array, object } from '@innet/utils';
import { createHandler } from 'innet';
import '../plugins/index.mjs';
import { portal } from '../plugins/jsx/portal/portal.mjs';
import { loop } from '../plugins/jsx/loop/loop.mjs';
import { router } from '../plugins/jsx/router/router.mjs';
import { link } from '../plugins/jsx/link/link.mjs';
import { delay } from '../plugins/jsx/delay/delay.mjs';
import { domJSX } from '../plugins/domJSX/domJSX.mjs';
import { domAsyncIterable } from '../plugins/domAsyncIterable/domAsyncIterable.mjs';
import { domIterable } from '../plugins/domIterable/domIterable.mjs';
import { domFn } from '../plugins/domFn/domFn.mjs';
import { domText } from '../plugins/domText/domText.mjs';
import { domNode } from '../plugins/domNode/domNode.mjs';
import { domAsync } from '../plugins/domAsync/domAsync.mjs';

const arrayPlugins = [
    arraySync,
];
const JSXPlugins = {
    context,
    portal,
    for: loop,
    slots,
    slot,
    router,
    a: link,
    delay,
};
const objectPlugins = [
    jsxPlugins(JSXPlugins),
    jsxComponent,
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
