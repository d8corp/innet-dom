import { Context } from '@innet/jsx'
import { type HandlerPlugin, innet, useApp, useHandler } from 'innet'
import type { Observer } from 'watch-state'
import { scope, Watch } from 'watch-state'

import { useContextWatcher } from '../../hooks'
import { clear, getComment } from '../../utils'

export const watcherContext = new Context<Observer>()

export function domFn (): HandlerPlugin {
  return () => {
    const fn = useApp<Function>()
    const handler = useHandler()
    const [childrenHandler, comment] = getComment(handler, fn.name || 'watch')

    useContextWatcher(() => {
      new Watch(() => {
        const watcher = scope.activeWatcher!

        if (watcher.updated) {
          clear(comment)
        } else {
          watcherContext.set(childrenHandler, watcher)
        }

        innet(fn(), childrenHandler, 0, true)
      })
    })
  }
}
