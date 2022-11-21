import { onDestroy, State } from 'watch-state'

export function useShow (delay: number = 100) {
  const show = new State(false)

  const timer = setTimeout(() => {
    show.value = true
  }, delay)

  onDestroy(() => {
    clearTimeout(timer)
  })

  return show
}
