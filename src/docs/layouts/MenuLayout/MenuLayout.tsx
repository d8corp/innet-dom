import { Compute } from 'watch-state'

import { Delay, Show } from '../../../components'
import type { ChildrenProps } from '../../../types'
import { OnPageMenu } from '../../components'
import { menu } from '../../menu'
import { isLaptop } from '../../state'
import { DelayPage, Flex, Link, titleLinks } from '../../ui'
import styles from './MenuLayout.module.scss'

const isShowOnPageMenu = new Compute(() => !isLaptop.value && titleLinks.value.size > 1)

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

      <Show when={isShowOnPageMenu}>
        <Delay hide={100}>
          <OnPageMenu />
        </Delay>
      </Show>
    </DelayPage>
  )
}
