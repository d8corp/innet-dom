import { GenericComponent } from '@innet/jsx'
import { callHandler } from '@innet/utils'
import { type HandlerPlugin, innet, NEXT, useApp, useHandler } from 'innet'
import { onDestroy, scope, Watch } from 'watch-state'

import { useContextWatcher, watcherContext } from '../../hooks'
import { clear, getComment } from '../../utils'

export const domIterable = (): HandlerPlugin => () => {
  const genericComponent = useApp<GenericComponent>()

  if (!(genericComponent instanceof GenericComponent)) return NEXT

  const handler = useHandler()
  const { app: apps, data } = genericComponent

  if (!(data instanceof Promise)) {
    innet(() => genericComponent.app.next(), callHandler, 0, true)
    innet(data.value, handler, 0, true)

    return
  }

  const [childrenHandler, comment] = getComment(handler, 'domIterable')

  const activeWatcher = useContextWatcher(() => {
    onDestroy(() => {
      deleted = true
    })
  })

  let watcher: Watch
  let deleted = false

  const call = (app: any) => {
    scope.activeWatcher = activeWatcher

    if (watcher) {
      watcher.destroy()
      clear(comment)
    }

    watcher = new Watch(() => {
      const watcher = scope.activeWatcher!

      if (watcher.updated) {
        clear(comment)
      } else {
        watcherContext.set(childrenHandler, watcher)
      }

      innet(app, childrenHandler, 0, true)
    })

    scope.activeWatcher = undefined
  }

  const run = async () => {
    for await (const app of apps) {
      if (deleted) return

      call(app)
    }
  }

  data.then(({ value }) => {
    call(value)
    run()
  })
}
