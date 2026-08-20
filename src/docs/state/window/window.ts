import { Compute, State } from 'watch-state'

export const pageWidth = new State(window.innerWidth)

export const isLaptop = new Compute(() => pageWidth.value < 1024)
export const isMobile = new Compute(() => pageWidth.value < 802)

window.addEventListener('resize', () => {
  pageWidth.set(window.innerWidth)
})
