import { Logo } from '../Logo'

import { Link } from '../../../components'
import { Button, Flex } from '../../ui'
import styles from './Header.scss'

export function Header () {
  return (
    <Flex element='header' class={styles.root}>
      <Flex flex padding={[0, 24]} align='center' justify='between' class={styles.content}>
        <Flex element='a' href='/' gap={12} align='center' class={styles.logo}>
          <Logo width={36} />
          <div>
            <span class={styles.innet}>innet</span>
            /dom
          </div>
        </Flex>
        <Flex element='nav' align='center' gap={28}>
          <Link href='/installation' class={styles.link}>Docs</Link>
          <a href='#' class={styles.link}>API</a>
          <a href='#' class={styles.link}>Examples</a>
          <a href='#' class={styles.link}>Playground</a>
          <Button element='a' href='https://github.com/d8corp/innet-dom' view='secondary'>
            GitHub
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
