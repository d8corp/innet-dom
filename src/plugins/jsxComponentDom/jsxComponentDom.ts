import { jsxComponent, useContext } from '@innet/jsx'
import type { HandlerPlugin } from 'innet'
import { scope } from 'watch-state'

import { watcherContext } from '../domFn'

export function jsxComponentDom (): HandlerPlugin {
  const jsx = jsxComponent()

  return () => {
    const watcher = useContext(watcherContext)

    if (watcher) {
      const prevObserver = scope.activeWatcher
      scope.activeWatcher = watcher
      const result = jsx()
      scope.activeWatcher = prevObserver

      return result
    }

    return jsx()
  }
}
