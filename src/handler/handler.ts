import { jsxPlugins, jsxTemplate } from '@innet/jsx'
import {
  array,
  arraySync,
  asyncIterable,
  fn,
  iterable,
  node,
  nullish,
  number,
  object,
  promise,
  stop,
  string,
} from '@innet/utils'
import { createHandler } from 'innet'

import {
  context,
  ContextProps,
  domAsync,
  domAsyncIterable,
  domFn,
  domIterable,
  domJSX,
  domNode,
  domText,
  loop,
  LoopProps,
  portal,
  PortalProps,
} from '../plugins'

export const arrayPlugins = [
  arraySync,
]

export const JSXPlugins = {
  context,
  portal,
  for: loop,
}

export const objectPlugins = [
  jsxPlugins(JSXPlugins),
  jsxTemplate,
  domJSX,
  asyncIterable([
    domAsyncIterable,
  ]),
  iterable([
    domIterable,
  ]),
]

export const fnPlugins = [
  domFn,
]

export const stringPlugins = [
  domText,
]

export const numberPlugins = [
  domText,
]

export const nodePlugins = [
  domNode,
]

export const promisePlugins = [
  domAsync,
]

export const handler = createHandler([
  nullish([stop]),
  promise(promisePlugins),
  node(nodePlugins),
  fn(fnPlugins),
  string(stringPlugins),
  number(numberPlugins),
  array(arrayPlugins),
  object(objectPlugins),
])

declare global {
  namespace JSX {
    interface IntrinsicElements {
      portal: PortalProps
      for: LoopProps
      context: ContextProps
      [elemName: string]: any;
    }
  }
}
