import { useHandler } from 'innet'

import { type TargetElements } from '../../types'
import { getParent } from '../../utils'

export function useParent<T extends TargetElements> (): T {
  return getParent(useHandler())
}
