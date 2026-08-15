import { classes } from 'html-classes'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { StateProp } from '../../../types'
import { inject, injectAll } from '../../../utils'
import $styles from './Divider.module.scss'

interface DividerPros extends HTMLStyleProps<HTMLHRElement, typeof $styles> {
  vertical?: StateProp<boolean>
}

export function Divider ({
  vertical,
  children,
  ...props
}: DividerPros = {}) {
  const styles = useStyles($styles)

  const root = injectAll([
    styles.root,
    inject(vertical, vertical => vertical && styles.vertical),
  ], classes)

  if (!children) {
    return (
      <hr {...props} class={root} />
    )
  }

  return (
    <fieldset class={root}>
      <legend class={styles.legend}>
        {children}
      </legend>
    </fieldset>
  )
}
