import { type Props } from '@innet/jsx'
import { type Handler } from 'innet'
import type { Observable, Reaction } from 'watch-state'

import { type Ref } from './utils'

type CamelToKebabCase<S extends string> = S extends `${infer T}${infer U}` ?
  `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${CamelToKebabCase<U>}` :
  S

type KeysToKebabCase<T> = {
  [K in keyof T as CamelToKebabCase<string & K>]: T[K]
}

/** @deprecated Use TargetElement */
export type TargetElements = Element | Comment
export type TargetElement = TargetElements
export type ContentElements = TargetElement | Text
export type ParentElements = TargetElement | DocumentFragment

export type UseComment = [Handler, Comment]

export type WatchProp <T> = T | Reaction<T>
export type StateProp <T> = WatchProp<T> | Observable<T>
export type ObservableProp <T> = T | Observable<T>
export type Component<P extends Props = Props> = (props: P) => JSX.Element
export type DomElement = HTMLElement | SVGElement

export type HTMLStyleKeys = keyof KeysToKebabCase<Omit<
  HTMLElement['style'],
  'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty'
>> | `--${string}`

export type HTMLStyleProp = Partial<Record<HTMLStyleKeys, StateProp<string>>>

export interface ChildrenProps {
  children?: any
}

export interface HTMLDefaultProps<E extends DomElement = HTMLElement> extends ChildrenProps {
  class?: StateProp<string | undefined>
  style?: HTMLStyleProp
  ref?: Ref<E>
}

export type HTMLDataProps = Record<`data-${string}`, StateProp<string>>

type ExcludeKeys = symbol | keyof HTMLDefaultProps

export type HTMLProps<E extends DomElement = HTMLElement> = {
  [K in Extract<keyof E, `on${string}`>]?: E[K];
} & {
  [K in Exclude<keyof E, ExcludeKeys> as NonNullable<E[K]> extends Function ? never : K]?: StateProp<string | undefined | (E[K] extends number ? number : undefined)>;
} & {
  [K in Exclude<keyof E, ExcludeKeys> as NonNullable<E[K]> extends Function ? never : `${'_' | '$'}${K}`]?: StateProp<E[K] | undefined>;
} & HTMLDefaultProps<E> & HTMLDataProps

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
