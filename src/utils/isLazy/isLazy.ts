import { type LazyFn } from '../lazy'

import { LAZY } from '../../constants'

export function isLazy (value: any): value is LazyFn {
  return LAZY in value
}
