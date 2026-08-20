import { Compute, createEvent, State } from 'watch-state'

import { Delay, Hide, Show } from '../../../components'
import type { ChildrenProps } from '../../../types'
import { OnPageMenu } from '../../components'
import { SidebarIcon } from '../../icons'
import { menu } from '../../menu'
import { isLaptop, isMobile } from '../../state'
import { DelayPage, Flex, Link, titleLinks } from '../../ui'
import styles from './MenuLayout.module.scss'

const isShowOnPageMenuDesktop = new State(true)
const isShowOnPageMenuMobile = new State(false)
const isShowOnPageMenu = new Compute(() => isLaptop.value ? isShowOnPageMenuMobile.value : isShowOnPageMenuDesktop.value)
const hasTitleLinks = new Compute(() => titleLinks.value.size > 1)

const toggleOnPageMenu = createEvent(() => {
  if (isLaptop.raw) {
    isShowOnPageMenuDesktop.value = isShowOnPageMenuMobile.value = !isShowOnPageMenuMobile.raw
  } else {
    isShowOnPageMenuDesktop.value = !isShowOnPageMenuDesktop.raw
    isShowOnPageMenuMobile.value = false
  }
})

export function MenuLayout ({ children }: ChildrenProps) {
  const itemClass = { root: styles.item, active: styles.itemSelected }

  return (
    <DelayPage class={styles.root} padding={[40, 24]} gap={24} vertical={false}>
      <Hide when={isMobile}>
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
      </Hide>

      <Flex element='main' flex class={styles.main}>
        {children}
      </Flex>

      <Show when={hasTitleLinks}>
        <Show when={isShowOnPageMenu}>
          <Delay hide={100}>
            <OnPageMenu />
          </Delay>
        </Show>
        <button class={styles.button} onclick={toggleOnPageMenu}>
          <SidebarIcon />
        </button>
      </Show>
    </DelayPage>
  )
}
