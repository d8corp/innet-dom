import { jsxComponent } from '@innet/jsx'
import type { HandlerPlugin } from 'innet'
import { scope } from 'watch-state'

import { useContextWatcher } from '../../hooks'

export function jsxComponentDom (): HandlerPlugin {
  const jsx = jsxComponent()

  return () => {
    const watcher = useContextWatcher()

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
