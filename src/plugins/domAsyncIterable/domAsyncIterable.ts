import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'
import { onDestroy, scope, Watch } from 'watch-state'

import { clear, getComment } from '../../utils'

export const domAsyncIterable = (): HandlerPlugin => () => {
  const handler = useHandler()
  const apps = useApp<AsyncIterable<any>>()
  const [childrenHandler, comment] = getComment(handler, 'asyncIterable')
  const { activeWatcher } = scope
  let watcher: Watch
  let deleted = false

  onDestroy(() => {
    deleted = true
  })

  const run = async () => {
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
  }

  run()
}
