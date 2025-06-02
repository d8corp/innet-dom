import { Observable, type Watcher } from 'watch-state'

import { type StateProp } from '../../types'
import { use } from '../use'

export type InjectCallback <V, R> = (value: V) => R

export function inject <V, R> (value: StateProp<V>, callback: InjectCallback<V, R>): R | Watcher<R> {
  if (value instanceof Observable || value instanceof Function) {
    return update => callback(use(value, update))
  }

  return callback(value)
}
