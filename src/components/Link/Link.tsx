import { historyPush, historyReplace, locationURL } from '@watch-state/history-api'
import classes from 'html-classes'
import { Cache } from 'watch-state'

import { getStyles, type HTMLStyleProps } from '../../hooks'
import { use } from '../../utils'

export const defaultLinkClass = {
  root: undefined,
  active: undefined,
}

const CLEAR_HREF = /([?#].*)?$/

function clearHref (url: string) {
  return url.replace(CLEAR_HREF, '')
}

export interface LinkProps extends HTMLStyleProps<HTMLAnchorElement, typeof defaultLinkClass> {
  target?: '_blank' | '_parent' | '_self' | '_top'
  scroll?: 'after' | 'before' | 'none'
  scrollTo?: number | string
  replace?: boolean
  exact?: boolean
  children?: JSX.Element
}

export function Link (props: LinkProps) {
  const styles = getStyles(defaultLinkClass, props)
  const { onclick, href, scroll, scrollTo, replace, exact, ...rest } = props

  if (!href || (typeof href === 'string' && href.startsWith('http'))) {
    return (
      <a
        {...rest}
        class={() => styles.root}
        href={href}
        rel={rest.rel ?? (href ? 'noopener noreferrer nofollow' : undefined)}
        target={rest.target ?? (href ? '_blank' : undefined)}
        onclick={onclick}
      />
    )
  }

  const getHref = (update: boolean) => use(href, update) || ''

  function createClassName () {
    const regString = new Cache(update => {
      const href = getHref(update)
      const prefix = href.startsWith('?')
        ? '[^?]*'
        : href.startsWith('#')
          ? '[^#]*'
          : ''

      return `^${prefix}${clearHref(href)}${exact ? '$' : ''}`
    })

    const reg = new Cache(() => new RegExp(regString.value))

    return new Cache(() => {
      return classes([
        styles.root,
        reg.value.test(locationURL.value) && styles.active,
      ])
    })
  }

  const className = rest.class ? createClassName() : undefined

  function handleClick (e: MouseEvent) {
    if (e.ctrlKey || e.metaKey) {
      // @ts-expect-error TODO: fix types
      return onclick?.call(this, e)
    }

    const href = getHref(false)
    let url = href
    const page = href?.startsWith('/')

    if (href?.startsWith('?')) {
      url = location.pathname + (href === '?' ? '' : href)
    } else if (href?.startsWith('#')) {
      url = location.pathname + location.search + (href === '#' ? '' : href)
    } else if (!page) {
      // @ts-expect-error TODO: fix types
      return onclick?.call(this, e)
    }

    e.preventDefault()

    const { scrollTo = page ? 0 : -1, scroll = 'before', replace } = props
    const call = replace ? historyReplace : historyPush

    call(url, scroll === 'none' ? -1 : scrollTo)
    // @ts-expect-error TODO: fix types
    onclick?.call(this, e)
  }

  return <a {...rest} class={className} href={href} onclick={handleClick} />
}
