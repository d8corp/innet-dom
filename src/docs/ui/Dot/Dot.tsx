import type { HTMLStyleProps } from '../../../hooks'
import { style } from '../../../hooks'

export type DotSize = 'm' | 's'
export type DotColor = 'error' | 'success' | 'warning'

import { classes } from 'html-classes'

import type { ObservableProp } from '../../../types'
import { inject } from '../../../utils'
import styles from './Dot.scss'

const useStyle = style(styles)

export interface DotProps extends HTMLStyleProps<HTMLSpanElement> {
  size?: ObservableProp<DotSize>
  color?: ObservableProp<DotColor>
}

export function Dot ({ size = 'm', color = 'warning', ...props }: DotProps) {
  const styles = useStyle()

  return (
    <span
      {...props}
      class={() => classes([
        styles.root,
        inject(size, size => styles[size]),
        inject(color, color => styles[color]),
      ])}
    />
  )
}
