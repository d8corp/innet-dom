import { JSXPluginElement } from '@innet/jsx'
import classes from 'html-classes'
import innet from 'innet'

import { getStyles, Style } from '../../../hooks/useStyle'
import { HTMLProps } from '../../../types'
import { Ref } from '../../../utils'
import { history } from '../router'

export const defaultClass = {
  root: undefined,
  active: undefined,
}

type OmitProps = 'scroll' | 'scrollTo' | 'href'

export interface LinkProps extends Style<typeof defaultClass>, Omit<HTMLProps<HTMLLinkElement>, OmitProps> {
  target?: '_blank' | '_parent' | '_self' | '_top'
  ref?: Ref<HTMLAnchorElement>
  href?: string | (() => string)
  scroll?: 'after' | 'before' | 'none'
  scrollTo?: number | string
  replace?: boolean
  exact?: boolean
  onclick?: (e: MouseEvent) => void
}

export function link ({ type, props, children }: JSXPluginElement<LinkProps, void>, oldHandler) {
  const handler = Object.create(oldHandler)
  handler[type] = undefined

  if (!props) return innet({ type: 'a', children }, handler)

  const styles = getStyles(defaultClass, props)
  const { onclick, href, scroll, scrollTo, replace, exact, ...rest } = props
  const getHref = typeof href === 'function' ? href : () => href

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

    return () => {
      const href = getHref()
      const prefix = href.startsWith('?')
        ? '[^?]*'
        : href.startsWith('#')
          ? '[^#]*' : ''

      return classes([
        styles.root,
        history.is(`^${prefix}${href.replace('?', '\\?')}${exact ? '$' : ''}`) && styles.active,
      ])
    }
  }

  const handleClick = e => {
    const href = getHref()
    let url = href
    const page = href.startsWith('/')

    if (href.startsWith('?')) {
      url = history.path + (href === '?' ? '' : href)
    } else if (href.startsWith('#')) {
      url = history.path + location.search + (href === '#' ? '' : href)
    } else if (!page) {
      return onclick?.(e)
    }
    e.preventDefault()
    const { scrollTo = page ? 0 : -1, scroll = 'before', replace } = props
    history[replace ? 'replace' : 'push'](url, scroll === 'none' ? -1 : scrollTo, scroll === 'before')
    onclick?.(e)
  }

  return innet({
    type: 'a',
    props: {
      ...rest,
      class: getClass(),
      href: () => {
        const { locale } = history
        const href = getHref()

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
