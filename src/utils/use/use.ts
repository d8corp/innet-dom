import { Cache, State } from 'watch-state'

import { StateProp } from '../../types'

export function use <T> (prop: StateProp<T>, update = false): T {
  if (prop instanceof State || prop instanceof Cache) {
    return prop.value
  }

  // @ts-expect-error
  return typeof prop === 'function' ? prop(update) : prop
}
