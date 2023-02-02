import { type Handler } from 'innet'

import { PARENT } from '../../constants'
import { type ParentElements } from '../../types'

export function getParent<T extends ParentElements> (handler: Handler): T {
  return handler[PARENT] || document.body
}
