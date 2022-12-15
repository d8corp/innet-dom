import { JSXPluginElement } from '@innet/jsx'
import classes from 'html-classes'
import innet from 'innet'

import { getStyles, HTMLStyleProps } from '../../../hooks/useStyle'
import { use } from '../../../utils'
import { history } from '../router'

export const defaultClass = {
  root: undefined,
  active: undefined,
}

export interface LinkProps extends HTMLStyleProps<HTMLAnchorElement, typeof defaultClass> {
  target?: '_blank' | '_parent' | '_self' | '_top'
  scroll?: 'after' | 'before' | 'none'
  scrollTo?: number | string
  replace?: boolean
  exact?: boolean
}

const CLEAR_HREF = /([?#].*)?$/

function clearHref (url: string) {
  return url.replace(CLEAR_HREF, '')
}

export function link ({ type, props, children }: JSXPluginElement<LinkProps, void>, oldHandler) {
  const handler = Object.create(oldHandler)
  handler[type] = undefined

  if (!props) return innet({ type: 'a', children }, handler)

  const styles = getStyles(defaultClass, props)
  const { onclick, href, scroll, scrollTo, replace, exact, ...rest } = props
  const getHref = (update: boolean) => use(href, update)

  if (!href || (typeof href === 'string' && href.startsWith('http'))) {
    return innet({
      type: 'a',
      props: {
        ...rest,
        class: () => styles.root,
        href,
        rel: rest.rel ?? (href ? 'noopener noreferrer nofollow' : undefined),
        target: rest.target ?? (href ? '_blank' : undefined),
        onclick,
      },
      children,
    }, handler)
  }

  const getClass = () => {
    if (!rest.class) return

    return (update: boolean) => {
      const href = getHref(update)
      const prefix = href.startsWith('?')
        ? '[^?]*'
        : href.startsWith('#')
          ? '[^#]*'
          : ''

      return classes([
        styles.root,
        history.is(`^${prefix}${clearHref(href)}${exact ? '$' : ''}`) && styles.active,
      ])
    }
  }

  const handleClick = e => {
    const href = getHref(false)
    let url = href
    const page = href.startsWith('/')

    if (href.startsWith('?')) {
      url = history.path + (href === '?' ? '' : href)
    } else if (href.startsWith('#')) {
      url = history.path + location.search + (href === '#' ? '' : href)
    } else if (!page) {
      return onclick?.apply(window, e)
    }
    e.preventDefault()
    const { scrollTo = page ? 0 : -1, scroll = 'before', replace } = props
    history[replace ? 'replace' : 'push'](url, scroll === 'none' ? -1 : scrollTo, scroll === 'before')
    onclick?.apply(window, e)
  }

  return innet({
    type: 'a',
    props: {
      ...rest,
      class: getClass(),
      href: (update) => {
        const { locale } = history
        const href = getHref(update)

        if (!locale) {
          return href
        }

        return href === '/' ? `/${locale}` : `/${locale}${href}`
      },
      onclick: handleClick,
    },
    children,
  }, handler)
}
