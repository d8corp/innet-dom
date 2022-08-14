import { jsxComponent, JSXPlugin, jsxPlugins } from '@innet/jsx'
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
  delay,
  DelayProps,
  domAsync,
  domAsyncIterable,
  domFn,
  domIterable,
  domJSX,
  domNode,
  domText,
  link,
  LinkProps,
  loop,
  LoopProps,
  portal,
  PortalProps,
  router,
  RouterProps,
  slot,
  SlotProps,
  slots,
  SlotsProps,
} from '../plugins'

export const arrayPlugins = [
  arraySync,
]

export const JSXPlugins: Record<string, JSXPlugin> = {
  context,
  portal,
  for: loop,
  slots,
  slot,
  router,
  a: link,
  delay,
}

export const objectPlugins = [
  jsxPlugins(JSXPlugins),
  jsxComponent,
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
      slots: SlotsProps
      slot: SlotProps
      a: LinkProps
      router: RouterProps
      delay: DelayProps
      [elemName: string]: any;
    }
  }
}
