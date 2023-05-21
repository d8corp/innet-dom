import { JSX_PLUGINS, type JSXPluginElement } from '@innet/jsx'
import { historyPush, historyReplace, locationURL } from '@watch-state/history-api'
import classes from 'html-classes'
import innet, { useApp, useHandler } from 'innet'
import { Cache } from 'watch-state'

import { getStyles, type HTMLStyleProps } from '../../../hooks/useStyle'
import { use } from '../../../utils'

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

export function link () {
  const { type, props, children } = useApp<JSXPluginElement<LinkProps, void>>()
  const handler = Object.create(useHandler())
  handler[JSX_PLUGINS] = Object.create(handler[JSX_PLUGINS])
  handler[JSX_PLUGINS][type] = undefined

  if (!props) {
    innet({ type: 'a', children }, handler)
    return
  }

  const styles = getStyles(defaultClass, props)
  const { onclick, href, scroll, scrollTo, replace, exact, ...rest } = props

  if (!href || (typeof href === 'string' && href.startsWith('http'))) {
    innet({
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
    return
  }

  const getHref = (update: boolean) => use(href, update)

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

    return new Cache(update => {
      return classes([
        styles.root,
        reg.value.test(locationURL.value) && styles.active,
      ])
    })
  }

  const className = rest.class && createClassName()

  function handleClick (e: MouseEvent) {
    if (e.ctrlKey || e.metaKey) return onclick?.call(this, e)

    const href = getHref(false)
    let url = href
    const page = href.startsWith('/')

    if (href.startsWith('?')) {
      url = location.pathname + (href === '?' ? '' : href)
    } else if (href.startsWith('#')) {
      url = location.pathname + location.search + (href === '#' ? '' : href)
    } else if (!page) {
      return onclick?.call(this, e)
    }

    e.preventDefault()

    const { scrollTo = page ? 0 : -1, scroll = 'before', replace } = props
    const call = replace ? historyReplace : historyPush

    call(url, scroll === 'none' ? -1 : scrollTo)
    onclick?.call(this, e)
  }

  innet({
    type: 'a',
    props: {
      ...rest,
      class: className,
      href,
      onclick: handleClick,
    },
    children,
  }, handler)
}
