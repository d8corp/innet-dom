import { GenericComponent } from '@innet/jsx'
import { callHandler } from '@innet/utils'
import { type HandlerPlugin, innet, NEXT, useApp, useHandler } from 'innet'
import { onDestroy, scope, Watch } from 'watch-state'

import { clear, getComment } from '../../utils'

export const domIterable = (): HandlerPlugin => () => {
  const genericComponent = useApp<GenericComponent>()

  if (!(genericComponent instanceof GenericComponent)) return NEXT

  const handler = useHandler()
  const { app: apps, data } = genericComponent

  if (!(data instanceof Promise)) {
    innet(data.value, handler, 0, true)
    innet(() => genericComponent.app.next(), callHandler, 0, true)

    return
  }

  const [childrenHandler, comment] = getComment(handler, 'domIterable')
  const { activeWatcher } = scope
  let watcher: Watch
  let deleted = false

  onDestroy(() => {
    deleted = true
  })

  const call = (app: any) => {
    scope.activeWatcher = activeWatcher

    if (watcher) {
      watcher.destroy()
      clear(comment)
    }

    watcher = new Watch(() => {
      if (scope.activeWatcher!.updated) {
        clear(comment)
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
