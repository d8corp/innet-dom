import Timer from 'sync-timer'
import { onDestroy, State } from 'watch-state'

export function useShow (delay: number = 100) {
  const show = new State(false)

  const timer = new Timer(() => {
    show.value = true
  }, delay)

  onDestroy(() => {
    timer.cancel()
  })

  return show
}
