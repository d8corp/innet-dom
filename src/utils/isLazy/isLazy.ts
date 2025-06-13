import { LAZY } from '../../constants'
import { type LazyFn } from '../lazy'

export function isLazy (value: any): value is LazyFn {
  return LAZY in value
}
