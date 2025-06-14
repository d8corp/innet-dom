import { jsxComponent } from '@innet/jsx';
import { arraySync, nullish, promise, node, fn, string, number, array, object } from '@innet/utils';
import { createHandler } from 'innet';
import '../plugins/index.es6.js';
import { state } from '../plugins/state/state.es6.js';
import { domJSX } from '../plugins/domJSX/domJSX.es6.js';
import { domIterable } from '../plugins/domIterable/domIterable.es6.js';
import { domFn } from '../plugins/domFn/domFn.es6.js';
import { domText } from '../plugins/domText/domText.es6.js';
import { domNode } from '../plugins/domNode/domNode.es6.js';
import { domAsync } from '../plugins/domAsync/domAsync.es6.js';

const arrayPlugins = [
    arraySync,
];
const objectPlugins = [
    state,
    jsxComponent,
    domJSX,
    domIterable,
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
    nullish([]),
    promise(promisePlugins),
    node(nodePlugins),
    fn(fnPlugins),
    string(stringPlugins),
    number(numberPlugins),
    array(arrayPlugins),
    object(objectPlugins),
]);

export { arrayPlugins, fnPlugins, handler, nodePlugins, numberPlugins, objectPlugins, promisePlugins, stringPlugins };
