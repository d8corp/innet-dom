import { Handler } from 'innet'

import { PARENT } from '../../constants'
import { ParentElements } from '../../types'

export function setParent (handler: Handler, parent: ParentElements) {
  handler[PARENT] = parent
}
