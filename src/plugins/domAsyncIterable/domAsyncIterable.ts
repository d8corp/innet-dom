import innet, { PluginHandler } from 'innet'
import { onDestroy, scope, Watch } from 'watch-state'

import { clear, useComment } from '../../utils'

export const domAsyncIterable = (): PluginHandler => async (apps, next, handler) => {
  const [childrenHandler, comment] = useComment(handler, 'asyncIterable')
  const { activeWatcher } = scope
  let watcher: Watch
  let deleted = false

  onDestroy(() => {
    deleted = true
  })

  for await (const app of apps) {
    if (deleted) return

    scope.activeWatcher = activeWatcher

    if (watcher) {
      watcher.destroy()
      clear(comment)
    }

    watcher = new Watch(update => {
      if (update) {
        clear(comment)
      }

      innet(app, childrenHandler)
    })

    scope.activeWatcher = undefined
  }

  return comment
}
