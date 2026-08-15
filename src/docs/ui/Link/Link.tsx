import { Link as LinkOrigin, type LinkProps } from '../../../components'
import { useStyles } from '../../../hooks'
import $styles from './Link.module.scss'

export function Link (props: LinkProps) {
  const styles = useStyles($styles)

  return <LinkOrigin {...props} class={styles} />
}
