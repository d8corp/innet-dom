import {
  context,
  type ContextProps,
  jsxComponent,
  jsxPlugins,
  slot,
  type SlotProps,
  slots,
  type SlotsProps,
} from '@innet/jsx'
import {
  array,
  arraySync,
  fn,
  node,
  nullish,
  number,
  object,
  promise,
  string,
} from '@innet/utils'
import { createHandler, type HandlerPlugin } from 'innet'

import {
  delay,
  type DelayProps,
  domAsync,
  domFn,
  domIterable,
  domJSX,
  domNode,
  domText,
  hide,
  type HideProps,
  link,
  type LinkProps,
  map,
  type MapProps,
  portal,
  type PortalProps,
  router,
  type RouterProps,
  show,
  type ShowProps,
  state,
  switchPlugin,
  type SwitchProps,
} from '../plugins'
import { type HTMLProps } from '../types'

export const arrayPlugins = [
  arraySync,
]

export const JSXPlugins: Record<string, HandlerPlugin> = {
  context,
  portal,
  map,
  slots,
  slot,
  router,
  a: link,
  delay,
  show,
  hide,
  switch: switchPlugin,
}

export const objectPlugins = [
  state,
  jsxPlugins(JSXPlugins),
  jsxComponent,
  domJSX,
  domIterable,
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
  nullish([]),
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
      map: MapProps
      context: ContextProps
      slots: SlotsProps
      slot: SlotProps
      router: RouterProps
      delay: DelayProps
      show: ShowProps
      hide: HideProps
      switch: SwitchProps
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
