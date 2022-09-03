import innet, { PluginHandler } from 'innet'
import { Watch } from 'watch-state'

import { clear, getComment } from '../../utils'

export function domFn (): PluginHandler {
  return (fn, next, handler) => {
    const [childrenHandler, comment] = getComment(handler, fn.name || 'watch')
    let result

    new Watch(update => {
      if (update) {
        clear(comment)
      }

      result = innet(fn(update), childrenHandler)
    })

    return result
  }
}
