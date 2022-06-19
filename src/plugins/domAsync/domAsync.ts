import innet, { PluginHandler } from 'innet'
import { onDestroy } from 'watch-state'

import { useComment } from '../../utils/useComment'

export function domAsync (): PluginHandler {
  return (app: Promise<any>, next, handler) => {
    const [childHandler] = useComment(handler, 'async')

    let removed = false

    onDestroy(() => {
      removed = true
    })

    return app.then(data => {
      if (!removed) {
        return innet(data, childHandler)
      }
    })
  }
}
