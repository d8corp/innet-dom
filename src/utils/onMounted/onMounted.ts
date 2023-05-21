import SyncTimer from 'sync-timer'
import { onDestroy } from 'watch-state'

export function onMounted (callback: () => void, delay?: number) {
  let destroyed = false

  onDestroy(() => {
    destroyed = true
  })

  new SyncTimer(() => {
    if (!destroyed) {
      callback()
    }
  }, delay)
}
