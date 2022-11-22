import { WatchProp } from '../../types'

export function use <T> (prop: WatchProp<T>, update = false): T {
  // @ts-expect-error
  return typeof prop === 'function' ? prop(update) : prop
}
