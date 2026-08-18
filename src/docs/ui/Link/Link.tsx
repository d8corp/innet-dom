import { Link as LinkOrigin, type LinkProps } from '../../../components'
import { useStyles } from '../../../hooks'
import { inject } from '../../../utils'
import { BASE_URL } from '../../constants'
import $styles from './Link.module.scss'

export function Link (props: LinkProps) {
  const styles = useStyles($styles)

  const href = inject(props.href, href => {
    return href?.startsWith('/') ? `/${BASE_URL}${href}` : href
  })

  return <LinkOrigin {...props} href={href} class={styles} />
}
