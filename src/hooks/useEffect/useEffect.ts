import { queueNanotask } from 'queue-nano-task'
import { watchWithScope } from 'watch-state'

import { useContextWatcher } from '../useContextWatcher'

export function useEffect (callback: () => void) {
  const watcher = useContextWatcher()

  if (watcher) {
    queueNanotask(() => watchWithScope(watcher, callback), 1)

    return
  }

  queueNanotask(callback, 1)
}
