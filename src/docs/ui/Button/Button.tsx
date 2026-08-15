import { classes } from 'html-classes'

import type { FlexProps } from '../Flex'
import { Flex } from '../Flex'

import { useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { inject, injectAll } from '../../../utils'
import styles from './Button.module.scss'

export type ButtonStyles = typeof styles

export type ButtonView = 'primary' | 'secondary'
export type ButtonSize = 'm' | 'l'

export type ButtonProps<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> = FlexProps<T, S> & {
  view?: ObservableProp<ButtonView>
  size?: ObservableProp<ButtonSize>
}

export function Button<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> ({
  size,
  view = 'primary',
  ...props
}: ButtonProps<T, S>) {
  const style = useStyles(styles)

  const root = injectAll([
    style.root,
    inject(view, view => styles[view]),
    inject(size, size => styles[size || 'm']),
  ], classes)

  return (
    <Flex
      inline
      justify='center'
      align='center'
      element='button'
      {...props as any}
      class={root}
    />
  )
}
