import {
  jsxComponent,
  type JSXElement,
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
import { createHandler } from 'innet'
import { type Observable } from 'watch-state'

import {
  domAsync,
  domFn,
  domIterable,
  domJSX,
  domNode,
  domText,
  state,
} from '../plugins'
import { type HTMLProps } from '../types'

export const arrayPlugins = [
  arraySync,
]

export const objectPlugins = [
  state,
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
    type Element =
      | PromiseElement
      | NonPromiseElement

    type NonPromiseElement =
      | ArrayElement
      | WatchElement
      | JSXElement
      | Generator<Element, void, unknown>
      | Observable<Element>
      | boolean
      | null
      | number
      | string
      | symbol
      | undefined
      | void

    interface ArrayElement extends Array<Element> {}

    type WatchElement = (update: boolean) => Element
    type PromiseElement = Promise<NonPromiseElement>

    interface ElementChildrenAttribute {
      // eslint-disable-next-line @typescript-eslint/ban-types
      children: {}
    }

    interface IntrinsicElements {
      a: HTMLProps<HTMLAnchorElement>
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
