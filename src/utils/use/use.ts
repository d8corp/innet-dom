import { Cache, State } from 'watch-state'
import { type Watcher } from 'watch-state/types'

import { type StateProp } from '../../types'

export function use <T> (prop: StateProp<T>, update = false): T {
  if (prop instanceof State || prop instanceof Cache) {
    return prop.value
  }

  return typeof prop === 'function' ? (prop as Watcher)(update) : prop
}
