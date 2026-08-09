import { classes } from 'html-classes'

import type { FlexProps, FlexStyles } from '../Flex'
import { Flex } from '../Flex'

import { style } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { inject } from '../../../utils'
import styles from './Button.scss'

export interface ButtonStyles extends FlexStyles {
  primary: string
  secondary: string
  m: string
  l: string
}

const useStyle = style(styles)

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
  const styles = useStyle()

  return (
    <Flex
      inline
      justify='center'
      align='center'
      element='button'
      {...props as any}
      class={() => classes([
        styles.root,
        inject(view, view => styles[view]),
        inject(size, size => styles[size || 'm']),
      ])}
    />
  )
}
