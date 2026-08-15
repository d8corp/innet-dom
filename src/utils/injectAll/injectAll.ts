import { Observable, type Reaction } from 'watch-state'

import { use } from '../use'

type UnwrapStateProp<X> = X extends Observable<infer V>
  ? V
  : X extends (() => infer V)
    ? V
    : X

type IsDynamic<X> = X extends Observable<any>
  ? true
  : X extends (() => any)
    ? true
    : false

type HasDynamic<T extends readonly any[]> = true extends {
  [K in keyof T]: IsDynamic<T[K]>
}[number]
  ? true
  : false

export function injectAll<T extends readonly any[], R> (
  values: readonly [...T],
  callback: (values: { [K in keyof T]: UnwrapStateProp<T[K]> }) => R,
): HasDynamic<T> extends true ? Reaction<R> : R {
  const hasDynamic = values.some((v: any) => v instanceof Observable || v instanceof Function)

  if (hasDynamic) {
    return (() => callback(values.map(use) as any)) as any
  }

  return callback(values as any) as any
}
