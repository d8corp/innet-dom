import { useHandler } from '@innet/jsx'

import { TargetElements } from '../../types'
import { getParent } from '../getParent'

export function useParent<T extends TargetElements> (): T {
  return getParent(useHandler())
}
