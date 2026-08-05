import { Observable, type Reaction } from 'watch-state'

import { use } from '../use'

import { type StateProp } from '../../types'

export type InjectCallback <V, R> = (value: V) => R

export function inject <V, R> (value: StateProp<V>, callback: InjectCallback<V, R>): R | Reaction<R> {
  if (value instanceof Observable || value instanceof Function) {
    return () => callback(use(value))
  }

  return callback(value)
}
