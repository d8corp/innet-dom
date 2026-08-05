import { Observable, type Reaction } from 'watch-state'

import { type StateProp } from '../../types'

export function use <T> (prop: StateProp<T>): T {
  if (prop instanceof Observable) {
    return prop.value
  }

  return typeof prop === 'function' ? (prop as Reaction<T>)() : prop
}
