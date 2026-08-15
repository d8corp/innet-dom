import { State } from 'watch-state'

export const pageWidth = new State(window.innerWidth)

window.addEventListener('resize', () => {
  pageWidth.set(window.innerWidth)
})
