import innet, { PluginHandler } from 'innet'
import { onDestroy } from 'watch-state'

import { clear, useComment } from '../../utils'

export const domAsyncIterable = (): PluginHandler => async (apps, next, handler) => {
  const [childrenHandler, comment] = useComment(handler, 'asyncIterable')
  let update = false
  let deleted = false

  onDestroy(() => {
    deleted = true
  })

  for await (const app of apps) {
    if (deleted) return

    if (update) {
      clear(comment)
    }

    innet(app, childrenHandler)

    update = true
  }

  return comment
}
