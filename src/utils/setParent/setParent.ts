import { Handler } from 'innet'

import { PARENT } from '../../constants'
import { TargetElements } from '../../types'

export function setParent (handler: Handler, parent: TargetElements | DocumentFragment) {
  handler[PARENT] = parent
}
