import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'
import { Watch } from 'watch-state'

import { clear, getComment } from '../../utils'

export function domFn (): HandlerPlugin {
  return () => {
    const fn = useApp<Function>()
    const handler = useHandler()
    const [childrenHandler, comment] = getComment(handler, fn.name || 'watch')

    new Watch(update => {
      if (update) {
        clear(comment)
      }

      innet(fn(update), childrenHandler)
    })
  }
}
