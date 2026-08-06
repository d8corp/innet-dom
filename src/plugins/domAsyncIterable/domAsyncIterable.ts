import { type HandlerPlugin, innet, useApp, useHandler } from 'innet'
import type { Observer } from 'watch-state'
import { onDestroy, scope, Watch } from 'watch-state'

import { useContextWatcher, watcherContext } from '../../hooks'
import { clear, getComment } from '../../utils'

export const domAsyncIterable = (): HandlerPlugin => () => {
  const handler = useHandler()
  const apps = useApp<AsyncIterable<any>>()
  const [childrenHandler, comment] = getComment(handler, 'asyncIterable')
  let watcher: Observer
  let deleted = false

  const activeWatcher = useContextWatcher(() => {
    onDestroy(() => {
      deleted = true
    })
  })

  const run = async () => {
    for await (const app of apps) {
      if (deleted) return

      scope.activeWatcher = activeWatcher

      if (watcher) {
        watcher.destroy()
        clear(comment)
      }

      new Watch(() => {
        watcher = scope.activeWatcher!

        if (watcher.updated) {
          clear(comment)
        } else {
          watcherContext.set(childrenHandler, watcher)
        }

        innet(app, childrenHandler, 0, true)
      })

      scope.activeWatcher = undefined
    }
  }

  run()
}
