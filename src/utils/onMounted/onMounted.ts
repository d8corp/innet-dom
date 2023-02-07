import { onDestroy } from 'watch-state'

import { setTimeoutSync } from '../setTimeoutSync'

export function onMounted (callback: () => void, delay?: number) {
  let destroyed = false

  onDestroy(() => {
    destroyed = true
  })

  setTimeoutSync(() => {
    if (!destroyed) {
      callback()
    }
  }, delay)
}
