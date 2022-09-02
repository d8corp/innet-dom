import { JSXPluginElement } from '@innet/jsx'
import innet from 'innet'

import { Ref } from '../../../utils'
import { history } from '../router'

export interface LinkClasses {
  root: string
  active: string
}

export interface LinkProps {
  href?: string
  class?: string
  classes?: Partial<LinkClasses>
  id?: string
  target?: '_blank' | '_parent' | '_self' | '_top'
  hidden?: boolean
  autofocus?: boolean
  type?: string
  push?: boolean
  exact?: boolean
  rel?: string
  ref?: Ref<HTMLAnchorElement>
  scroll?: 'after' | 'before' | 'none'
  scrollTo?: number | string
  replace?: boolean
  onclick?: (e: MouseEvent) => any
  [key: string]: any
}

export function link ({ type, props, children }: JSXPluginElement<LinkProps, void>, oldHandler) {
  const handler = Object.create(oldHandler)
  handler[type] = undefined

  if (!props || !props.href) {
    return innet({
      type: 'a',
      props,
      children,
    }, handler)
  }

  const { onclick, href, classes } = props

  if (classes) {
    const { class: className, exact } = props
    delete props.classes
    delete props.exact

    if (classes.active) {
      const postfix = className && classes.root ? `${className} ${classes.root}` : className || classes.root
      let prefix = ''
      if (href.startsWith('?')) {
        prefix = '[^?]*'
      } else if (href.startsWith('#')) {
        prefix = '[^#]*'
      } else if (!href.startsWith('/')) {
        return false
      }
      props.class = (() => !history.is(`^${prefix}${href}${exact ? '$' : ''}`) ? postfix : postfix ? `${postfix} ${classes.active}` : classes.active) as unknown as string
    } else if (classes.root) {
      props.class = className ? `${className} ${classes.root}` : classes.root
    }
  }

  props.onclick = (e) => {
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

  if (href.startsWith('http')) {
    if (!props.rel) {
      props.rel = 'noopener noreferrer nofollow'
    }
    if (!props.target) {
      props.target = '_blank'
    }
  } else {
    props.href = (() => {
      const { locale } = history
      return !locale ? href : href === '/' ? `/${locale}` : `/${locale}${href}`
    }) as unknown as string
  }

  return innet({
    type: 'a',
    props,
    children,
  }, handler)
}
