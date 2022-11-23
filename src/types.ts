import { Handler } from 'innet'

import { Ref } from './utils'

export type ContentElements = TargetElements | Text
export type TargetElements = Element | Comment

export type UseComment = [Handler, Comment]

export type WatchProp <T> = T | ((update: boolean) => T)

export type HTMLProps<E extends HTMLElement = HTMLElement, K extends keyof E = keyof E> =
  Partial<Record<`${'_' | '$'}${Exclude<K, symbol | `on${string}`>}`, any>> &
  Partial<Record<Extract<K, `on${string}`>, (e: Event) => void>> & {
    style?: WatchProp<string>
    ref?: Ref<E>
    [prop: string]: any
  }

declare global {
  interface Comment {
    _children: ContentElements[]
    _parent?: Comment
  }

  interface Element {
    _parent?: Comment
  }

  interface Text {
    _parent?: Comment
  }
}
