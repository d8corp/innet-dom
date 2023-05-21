import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'
import { onDestroy, scope } from 'watch-state'

import { getComment } from '../../utils'

export function domAsync (): HandlerPlugin {
  return () => {
    const handler = useHandler()
    const app = useApp<Promise<any>>()
    const [childHandler] = getComment(handler, 'async')

    let removed = false

    onDestroy(() => {
      removed = true
    })

    const { activeWatcher } = scope

    app.then(data => {
      if (!removed) {
        scope.activeWatcher = activeWatcher
        innet(data, childHandler)
        scope.activeWatcher = undefined
      }
    })
  }
}
