import { Context } from '@innet/jsx'
import { useHandler } from 'innet'
import type { Observer, Reaction } from 'watch-state'
import { watchWithScope } from 'watch-state'

export const watcherContext = new Context<Observer>()

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
