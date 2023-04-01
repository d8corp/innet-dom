import {
  context,
  type ContextProps,
  jsxComponent,
  type JSXPlugin,
  jsxPlugins,
  slot,
  type SlotProps,
  slots,
  type SlotsProps,
} from '@innet/jsx'
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
  delay,
  type DelayProps,
  domAsync,
  domAsyncIterable,
  domFn,
  domIterable,
  domJSX,
  domNode,
  domText,
  hide,
  type HideProps,
  link,
  type LinkProps,
  loop,
  type LoopProps,
  portal,
  type PortalProps,
  router,
  type RouterProps,
  show,
  type ShowProps,
  state,
} from '../plugins'
import { type HTMLProps } from '../types'

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
  show,
  hide,
}

export const objectPlugins = [
  state,
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
    // @ts-expect-error: need to be redeclared
    interface IntrinsicElements {
      portal: PortalProps
      for: LoopProps
      context: ContextProps
      slots: SlotsProps
      slot: SlotProps
      router: RouterProps
      delay: DelayProps
      show: ShowProps
      hide: HideProps
      a: LinkProps
      div: HTMLProps<HTMLDivElement>
      span: HTMLProps<HTMLSpanElement>
      h1: HTMLProps<HTMLHeadingElement>
      h2: HTMLProps<HTMLHeadingElement>
      h3: HTMLProps<HTMLHeadingElement>
      h4: HTMLProps<HTMLHeadingElement>
      h5: HTMLProps<HTMLHeadingElement>
      h6: HTMLProps<HTMLHeadingElement>
      ul: HTMLProps<HTMLUListElement>
      ol: HTMLProps<HTMLOListElement>
      li: HTMLProps<HTMLLIElement>
      p: HTMLProps<HTMLParagraphElement>
      button: HTMLProps<HTMLButtonElement>
      form: HTMLProps<HTMLFormElement>
      select: HTMLProps<HTMLSelectElement>
      textarea: HTMLProps<HTMLTextAreaElement>
      input: HTMLProps<HTMLInputElement>
      img: HTMLProps<HTMLImageElement>
      table: HTMLProps<HTMLTableElement>
      [elemName: string]: any
    }
  }
}
