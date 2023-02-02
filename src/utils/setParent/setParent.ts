import { type Handler } from 'innet'

import { PARENT } from '../../constants'
import { type ParentElements } from '../../types'

export function setParent (handler: Handler, parent: ParentElements) {
  handler[PARENT] = parent
}
