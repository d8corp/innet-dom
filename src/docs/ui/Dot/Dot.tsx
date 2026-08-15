import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'

export type DotSize = 'm' | 's'
export type DotColor = 'error' | 'success' | 'warning'

import { classes } from 'html-classes'

import type { ObservableProp } from '../../../types'
import { inject, injectAll } from '../../../utils'
import $styles from './Dot.module.scss'

export interface DotProps extends HTMLStyleProps<HTMLSpanElement, typeof $styles> {
  size?: ObservableProp<DotSize>
  color?: ObservableProp<DotColor>
}

export function Dot ({ size = 'm', color = 'warning', ...props }: DotProps) {
  const styles = useStyles($styles)

  return (
    <span
      {...props}
      class={injectAll([
        styles.root,
        inject(size, size => styles[size]),
        inject(color, color => styles[color]),
      ], classes)}
    />
  )
}
