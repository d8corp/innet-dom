import { State } from 'watch-state'

export const scrolling = new State(false)

let timer: any

document.addEventListener('scroll', () => {
  clearTimeout(timer)
  scrolling.set(true)

  timer = setTimeout(() => {
    scrolling.set(false)
  }, 100)
})
