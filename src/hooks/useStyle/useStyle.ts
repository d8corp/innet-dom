import { useProps } from '@innet/jsx'
import { classes, type ClassesArgument } from 'html-classes'
import type { Reaction } from 'watch-state/types'

import { type HTMLProps } from '../../types'
import { inject } from '../../utils'

export type Styles = Record<string, any>

export interface Style<S = any> {
  class?: ClassesArgument<keyof S> | Record<keyof S, ClassesArgument<keyof S>>
}

export type HTMLStyleProps<E extends HTMLElement = HTMLElement, S = any> = Omit<HTMLProps<E>, 'class'> & Style<S>

/** @deprecated Use `restyle` instead */
export function getStyles<S extends Styles> (styles: S, props: any): S {
  if (!props?.class) {
    return styles
  }

  const className = props.class

  if (typeof className !== 'object' || Array.isArray(className)) {
    const result = { ...styles }

    Object.defineProperty(result, 'root', {
      get () {
        return classes([styles.root, className])
      },
    })

    return result
  }

  const result = {} as S

  for (const key in styles) {
    Object.defineProperty(result, key, {
      get () {
        return classes([
          styles[key],
          className[key],
        ])
      },
    })
  }

  return result
}

/** @deprecated Use `restyle` instead */
export function style<S> (styles: S, rest?: Record<string, any>) {
  return function useStyle (): S {
    const props = useProps()

    // @ts-expect-error TODO: fix types
    return getStyles(rest ? Object.assign({}, styles, rest) : styles, props)
  }
}

export function useStyles<S extends Record<string, string>> (styles: S): { [K in keyof S]: string | Reaction<string> } {
  const props = useProps()
  if (!props) return styles

  const classNames = typeof props.class === 'object' ? props.class : { root: props.class }
  const result: S = {} as S

  for (const key in styles) {
    const className = classNames[key]

    result[key] = inject(className, className => classes([
      styles[key],
      className,
    ])) as any
  }

  return result
}
