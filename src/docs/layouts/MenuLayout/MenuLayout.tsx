import { Delay, Show } from '../../../components'
import type { ChildrenProps } from '../../../types'
import { Aside, Side } from '../../components'
import { AsideIcon, SideIcon } from '../../icons'
import { hasTitleLinks, isMobile, isShowAside, isShowSide, toggleIsShowSide, toggleOnPageMenu } from '../../state'
import { DelayPage, Flex } from '../../ui'
import styles from './MenuLayout.module.scss'

export function MenuLayout ({ children }: ChildrenProps) {
  return (
    <DelayPage class={styles.root} padding={[40, 24]} gap={24} vertical={false}>
      <Flex element='main' flex class={styles.main}>
        {children}
      </Flex>

      <Show when={isShowSide}>
        <Delay hide={200}>
          <Side />
        </Delay>
      </Show>

      <Show when={isMobile}>
        <button class={styles.sideButton} onclick={toggleIsShowSide}>
          <SideIcon />
        </button>
      </Show>

      <Show when={hasTitleLinks}>
        <Show when={isShowAside}>
          <Delay hide={100}>
            <Aside />
          </Delay>
        </Show>
        <button class={styles.asideButton} onclick={toggleOnPageMenu}>
          <AsideIcon />
        </button>
      </Show>
    </DelayPage>
  )
}
