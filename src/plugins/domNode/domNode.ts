import { type PluginHandler } from 'innet'

import { append } from '../../utils/dom'
import { getParent } from '../../utils/getParent'

export function domNode (): PluginHandler {
  return (node, next, handler) => {
    const parent = getParent(handler)

    append(parent, node)

    return parent
  }
}
