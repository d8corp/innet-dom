import { Observable, type Watcher } from 'watch-state'

import { type StateProp } from '../../types'

export function use <T> (prop: StateProp<T>, update = false): T {
  if (prop instanceof Observable) {
    return prop.value
  }

  return typeof prop === 'function' ? (prop as Watcher<T>)(update) : prop
}
