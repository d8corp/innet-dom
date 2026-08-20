import { classes } from 'html-classes'
import { Compute } from 'watch-state'

import { Logo } from '../Logo'

import { Hide } from '../../../components'
import { useShow } from '../../../hooks'
import { pageWidth } from '../../state'
import { Button, Flex, Link } from '../../ui'
import styles from './Header.scss'

export function Header () {
  const show = useShow()

  const hideMenu = new Compute(() => pageWidth.value < 420)

  return (
    <Flex element='header' class={() => classes([styles.root, show.value && styles.show])}>
      <Flex flex padding={[0, 24]} align='center' justify='between' class={styles.content}>
        <Flex element='a' exact href='/' gap={12} align='center' class={styles.logo}>
          <Logo width={36} />
          <div>
            <span class={styles.innet}>innet</span>
            /dom
          </div>
        </Flex>
        <Flex element='nav' align='center' gap={28}>
          <Hide when={hideMenu}>
            <Link href='/quick-start' class={styles.link}>Docs</Link>
            <Link href='https://www.npmjs.com/package/@innet/dom' class={styles.link}>NPM</Link>
          </Hide>
          <Button view='secondary' element='a' href='https://github.com/d8corp/innet-dom'>GitHub</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
