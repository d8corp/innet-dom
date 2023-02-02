import { Cache, State } from 'watch-state'

import { type StateProp } from '../../types'
import { use } from '../use'

export type InjectCallback <V, R> = (value: V) => R

export function inject <V, R> (value: StateProp<V>, callback: InjectCallback<V, R>): StateProp<R> {
  if (value instanceof State || value instanceof Cache || value instanceof Function) {
    return () => callback(use(value))
  }

  return callback(value)
}
