import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import $styles from './Typography.module.scss'

export interface TypographyProps extends HTMLStyleProps <HTMLDivElement, typeof $styles> {
  flex?: number | boolean
}

export function Typography ({ flex, style, ...props }: TypographyProps) {
  const styles = useStyles($styles)

  return (
    <article
      {...props}
      style={{ '--ui-typography-flex': String(flex === true ? 1 : flex || ''), ...style }}
      class={styles.root}
    />
  )
}
