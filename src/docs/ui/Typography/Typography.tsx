import { style } from '../../../hooks'
import type { HTMLProps } from '../../../types'
import styles from './Typography.scss'

const useStyle = style(styles)

export type TypographyProps = HTMLProps <HTMLDivElement>

export function Typography (props: TypographyProps) {
  const styles = useStyle()

  return <article {...props} class={styles.root} />
}
