import { useHandler } from 'innet'
import type { Reaction } from 'watch-state'
import { watchWithScope } from 'watch-state'

import { watcherContext } from '../../plugins'

export function useContextWatcher (callback?: Reaction<any>) {
  const handler = useHandler()
  const watcher = watcherContext.get(handler)

  if (callback) {
    if (watcher) {
      watchWithScope(watcher, callback)
    } else {
      callback()
    }
  }

  return watcher
}
