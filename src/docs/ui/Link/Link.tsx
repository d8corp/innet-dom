import { Link as LinkOrigin, type LinkProps } from '../../../components'
import { useStyles } from '../../../hooks'
import classNames from './Link.module.scss'

export function Link (props: LinkProps) {
  const styles = useStyles(classNames)

  return <LinkOrigin {...props} class={styles} />
}
