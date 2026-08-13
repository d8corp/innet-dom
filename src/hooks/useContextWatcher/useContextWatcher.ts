import { Context, useContext } from '@innet/jsx'
import type { Observer, Reaction } from 'watch-state'
import { watchWithScope } from 'watch-state'

export const watcherContext = new Context<Observer>()

export function useContextWatcher (callback?: Reaction<any>) {
  const watcher = useContext(watcherContext)

  if (callback) {
    if (watcher) {
      watchWithScope(watcher, callback)
    } else {
      callback()
    }
  }

  return watcher
}
