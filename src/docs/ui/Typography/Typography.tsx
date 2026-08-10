import { style } from '../../../hooks'
import type { HTMLProps } from '../../../types'
import styles from './Typography.scss'

const useStyle = style(styles)

export interface TypographyProps extends HTMLProps <HTMLDivElement> {
  flex?: number | boolean
}

export function Typography ({ flex, style, ...props }: TypographyProps) {
  const styles = useStyle()

  return (
    <article
      {...props}
      style={{ '--ui-typography-flex': String(flex === true ? 1 : flex || ''), ...style }}
      class={styles.root}
    />
  )
}
