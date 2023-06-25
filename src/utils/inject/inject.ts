import { Observable } from 'watch-state'

import { type StateProp } from '../../types'
import { use } from '../use'

export type InjectCallback <V, R> = (value: V) => R

export function inject <V, R> (value: StateProp<V>, callback: InjectCallback<V, R>): StateProp<R> {
  if (value instanceof Observable || value instanceof Function) {
    return update => callback(use(value, update))
  }

  return callback(value)
}
