import { Link } from '../../../components'
import type { ChildrenProps } from '../../../types'
import { menu } from '../../menu'
import { DelayPage, Flex } from '../../ui'
import styles from './MenuLayout.scss'

export function MenuLayout ({ children }: ChildrenProps) {
  const itemClass = { root: styles.item, active: styles.itemSelected }

  return (
    <DelayPage class={styles.root} padding={[40, 24]} gap={24} vertical={false}>
      <Flex element='aside' vertical gap={24} class={styles.menu}>
        {menu.map(({ title, children }) => (
          <Flex vertical gap={10}>
            <div class={styles.group}>{title}</div>
            <Flex vertical gap={4}>
              {children.map(props => <Link {...props} class={itemClass} />)}
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Flex element='main' flex class={styles.main}>
        {children}
      </Flex>

      <aside class={styles.submenu}>
        <div class={styles.submenuTitle}>
          On this page
        </div>
        <Flex vertical gap={8} class={styles.submenuContent}>
          <Link href='#quick-start' class={styles.subItem}>Quick Start</Link>
          <Link href='#installation' class={styles.subItem}>Installation</Link>
          <Link href='#hello-world' class={styles.subItem}>Hello World</Link>
          <Link href='#typescript-configuration' class={styles.subItem}>TypeScript Configuration</Link>
          <Link href='#whats-next' class={styles.subItem}>What's Next?</Link>
        </Flex>
      </aside>
    </DelayPage>
  )
}
