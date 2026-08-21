import { State } from 'watch-state'

export const scrolling = new State(false)

export const listenScrolling = () => {
  let timer: any

  document.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      document.body.style.setProperty('--scroll', document.scrollingElement?.scrollTop + 'px')
    })

    clearTimeout(timer)
    scrolling.set(true)

    timer = setTimeout(() => {
      scrolling.set(false)
    }, 100)
  })
}
