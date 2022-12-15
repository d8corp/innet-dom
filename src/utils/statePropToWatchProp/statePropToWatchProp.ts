import { Cache, State } from 'watch-state'

import { StateProp, WatchProp } from '../../types'

export function statePropToWatchProp <T> (value: StateProp<T>): WatchProp<T> {
  if (value instanceof State || value instanceof Cache) {
    const oldValue = value
    return () => oldValue.value
  }

  return value
}
