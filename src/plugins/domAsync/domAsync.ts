import { type HandlerPlugin, innet, useApp, useHandler } from 'innet'
import { onDestroy } from 'watch-state'

import { useContextWatcher } from '../../hooks'
import { getComment } from '../../utils'

export function domAsync (): HandlerPlugin {
  return () => {
    const handler = useHandler()
    const app = useApp<Promise<any>>()
    const [childHandler] = getComment(handler, 'async')

    let removed = false

    useContextWatcher(() => {
      onDestroy(() => {
        removed = true
      })
    })

    app.then(data => {
      if (!removed) {
        innet(data, childHandler, 0, true)
      }
    })
  }
}
