import innet, { PluginHandler } from 'innet'
import { onDestroy, scope } from 'watch-state'

import { clear, useComment } from '../../utils'

export const domAsyncIterable = (): PluginHandler => async (apps, next, handler) => {
  const [childrenHandler, comment] = useComment(handler, 'asyncIterable')
  const { activeWatcher } = scope
  let update = false
  let deleted = false

  onDestroy(() => {
    deleted = true
  })

  for await (const app of apps) {
    scope.activeWatcher = activeWatcher
    if (deleted) return

    if (update) {
      clear(comment)
    }

    innet(app, childrenHandler)

    update = true
    scope.activeWatcher = undefined
  }

  return comment
}
