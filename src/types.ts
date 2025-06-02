import { type Handler } from 'innet'
import { type Observable, type Watcher } from 'watch-state'

import { type Ref } from './utils'

type CamelToKebabCase<S extends string> = S extends `${infer T}${infer U}` ?
  `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${CamelToKebabCase<U>}` :
  S

type KeysToKebabCase<T> = {
  [K in keyof T as CamelToKebabCase<string & K>]: T[K]
}

export type ContentElements = TargetElements | Text
export type TargetElements = Element | Comment
export type ParentElements = TargetElements | DocumentFragment

export type UseComment = [Handler, Comment]

export type WatchProp <T> = T | Watcher<T>
export type StateProp <T> = WatchProp<T> | Observable<T>
export type ObservableProp <T> = T | Observable<T>

export type HTMLStyleKeys = keyof KeysToKebabCase<Omit<
HTMLElement['style'],
'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty'
>> | `--${string}`
export type HTMLStyleProp = Partial<Record<HTMLStyleKeys, StateProp<string>>>

export interface ChildrenProps {
  children?: any
}

export interface HTMLDefaultProps<E extends HTMLElement = HTMLElement> extends ChildrenProps {
  class?: StateProp<string>
  style?: HTMLStyleProp
  ref?: Ref<E>
}

export type HTMLDataProps = Record<`data-${string}`, StateProp<string>>

export type HTMLProps<E extends HTMLElement = HTMLElement> = Omit<{
  [K in Extract<keyof E, `on${string}`>]?: E[K];
} & {
  [K in Exclude<keyof E, symbol> as E[K] extends Function ? never : `${'' | '_' | '$'}${K}`]?: StateProp<E[K] | undefined>;
}, keyof HTMLDefaultProps> & HTMLDefaultProps<E> & HTMLDataProps

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
