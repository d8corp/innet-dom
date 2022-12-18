import { Handler } from 'innet'

import { PARENT } from '../../constants'
import { ParentElements } from '../../types'

export function getParent<T extends ParentElements> (handler: Handler): T {
  return handler[PARENT] || document.body
}
