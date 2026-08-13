import { pushHistory, replaceHistory } from '@watch-state/history-api'
import { scrollTo as scrollToFn } from 'web-scroll'

export interface LinkToParams {
  scroll?: 'after' | 'before' | 'none'
  scrollTo?: number | string
  replace?: boolean
}

export function linkTo (href: string, { scroll = 'before', scrollTo, replace }: LinkToParams = {}) {
  const page = href?.startsWith('/')
  let url = href

  if (href?.startsWith('?')) {
    url = location.pathname + (href === '?' ? '' : href)
  } else if (href?.startsWith('#')) {
    url = location.pathname + location.search + (href === '#' ? '' : href)
  } else if (!page) {
    return false
  }

  const call = replace ? replaceHistory : pushHistory

  const scrolling = () => {
    if (scrollTo) {
      // From props
      scrollToFn(scrollTo, { block: 'start' })
    } else if (page && !url.includes('#')) {
      // Path without hash
      scrollToFn(0, { block: 'start' })
    } else if (href.startsWith('#')) {
      // Hash
      scrollToFn(href, { block: 'start' })
    } else if (page) {
      const hash = url.slice(url.indexOf('#'))
      const id = hash.slice(1)
      let attempts = 5

      const check = () => {
        if (document.getElementById(id)) {
          scrollToFn(hash, { block: 'start' })

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

  if (scroll === 'none') {
    call(url)
  } else if (scroll === 'before') {
    scrolling()
    call(url)
  } else {
    call(url)
    scrolling()
  }

  return true
}
