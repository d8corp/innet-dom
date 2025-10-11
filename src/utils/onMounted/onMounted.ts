import SyncTimer from 'sync-timer'
import { onDestroy } from 'watch-state'

export function onMounted (callback: () => void, delay?: number) {
  const timer = new SyncTimer(callback, delay)

  onDestroy(() => {
    timer.cancel()
  })
}
