import { Link } from '../../../components'
import { Flex } from '../../ui'
import styles from './Footer.scss'

export function Footer () {
  return (
    <Flex element='footer' class={styles.root}>
      <Flex align='center' flex justify='between' class={styles.content}>
        © 2022 Mike Lysikov. MIT License.
        <Flex gap={20}>
          <Link href='https://github.com/d8corp/innet-dom/pulls' class={styles.link}>Pulls</Link>
          <Link href='https://github.com/d8corp/innet-dom/issues' class={styles.link}>Issues</Link>
        </Flex>
      </Flex>
    </Flex>
  )
}
