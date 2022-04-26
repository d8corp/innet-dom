import { Handler } from 'innet'

import { PARENT } from '../../constants'
import { TargetElements } from '../../types'

export function getParent<T extends TargetElements> (handler: Handler): T {
  return handler[PARENT] || document.body
}
