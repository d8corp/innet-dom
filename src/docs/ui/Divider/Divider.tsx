import { classes } from 'html-classes'

import type { HTMLStyleProps } from '../../../hooks'
import { style } from '../../../hooks'
import type { StateProp } from '../../../types'
import { use } from '../../../utils'
import styles from './Divider.scss'

const useStyles = style(styles)

interface DividerPros extends HTMLStyleProps<HTMLHRElement> {
  vertical?: StateProp<boolean>
}

export function Divider ({
  vertical,
  children,
  ...props
}: DividerPros = {}) {
  const styles = useStyles()

  if (!children) {
    return (
      <hr
        {...props}
        class={() => classes([
          styles.root,
          use(vertical) && styles.vertical,
        ])}
      />
    )
  }

  return (
    <fieldset
      class={() => classes([
        styles.root,
        use(vertical) && styles.vertical,
      ])}
    >
      <legend class={() => styles.legend}>
        {children}
      </legend>
    </fieldset>
  )
}
