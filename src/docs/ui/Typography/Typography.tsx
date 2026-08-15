import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import classNames from './Typography.module.scss'

export interface TypographyProps extends HTMLStyleProps <HTMLDivElement, typeof classNames> {
  flex?: number | boolean
}

export function Typography ({ flex, style, ...props }: TypographyProps) {
  const styles = useStyles(classNames)

  return (
    <article
      {...props}
      style={{ '--ui-typography-flex': String(flex === true ? 1 : flex || ''), ...style }}
      class={styles.root}
    />
  )
}
