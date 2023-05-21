import { Observable } from 'watch-state'

import { type StateProp, type WatchProp } from '../../types'

export function statePropToWatchProp <T> (value: StateProp<T>): WatchProp<T> {
  if (value instanceof Observable) {
    return () => value.value
  }

  return value
}
