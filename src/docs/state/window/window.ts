import { Compute, State } from 'watch-state'

export const pageWidth = new State(window.innerWidth)

export const isLaptop = new Compute(() => pageWidth.value < 1024)

window.addEventListener('resize', () => {
  pageWidth.set(window.innerWidth)
})
