import { type HandlerPlugin, innet, useApp, useHandler } from 'innet'
import { queueNanotask } from 'queue-nano-task'
import { scope, Watch } from 'watch-state'

import { useContextWatcher, watcherContext } from '../../hooks'
import { clear, getComment } from '../../utils'

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

          queueNanotask(() => {
            watcher.updated = true
          })
        }

        innet(fn(), childrenHandler, 0, true)

        if (!watcher.updated) {
          queueNanotask(() => {
            watcher.updated = false
          }, 0, true)
        }
      })
    })
  }
}
