import { Delay, Hide, Show } from '../../../components'
import type { ChildrenProps } from '../../../types'
import { Aside, Side } from '../../components'
import { AsideIcon, SideIcon } from '../../icons'
import { hasTitleLinks, isMobile, isShowAside, isShowSide, toggleIsShowAside, toggleIsShowSide } from '../../state'
import { DelayPage, Flex } from '../../ui'
import styles from './MenuLayout.module.scss'

export function MenuLayout ({ children }: ChildrenProps) {
  return (
    <DelayPage class={styles.root} padding={[40, 24]}>
      <Flex flex gap={24}>
        <Flex element='main' flex class={styles.main}>
          {children}
        </Flex>

        <Show when={isShowSide}>
          <Delay hide={200}>
            <Side />
          </Delay>
        </Show>

        <Show when={hasTitleLinks}>
          <Show when={isShowAside}>
            <Delay hide={100}>
              <Aside />
            </Delay>
          </Show>
          <Hide when={isMobile}>
            <button class={styles.asideButton} onclick={toggleIsShowAside}>
              <AsideIcon />
            </button>
          </Hide>
        </Show>
      </Flex>
      <Show when={isMobile}>
        <Flex gap={24} class={styles.buttons}>
          <button class={styles.button} onclick={toggleIsShowSide}>
            <SideIcon />
          </button>
          <Show when={hasTitleLinks}>
            <button class={styles.button} onclick={toggleIsShowAside}>
              <AsideIcon />
            </button>
          </Show>
        </Flex>
      </Show>
    </DelayPage>
  )
}
