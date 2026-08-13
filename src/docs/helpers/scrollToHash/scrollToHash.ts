import { scrollTo } from 'web-scroll'

export function scrollToHash () {
  if (location.hash) {
    const navEntry: any = performance.getEntriesByType('navigation')[0]
    if (navEntry?.type !== 'navigate') return

    const hash = location.hash
    const id = hash.slice(1)
    let attempts = 5

    const check = () => {
      if (document.getElementById(id)) {
        scrollTo(hash, { block: 'start' })

        return
      }

      if (attempts) {
        attempts--
      }

      setTimeout(check, 200)
    }

    check()
  }
}
