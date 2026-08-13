import { classes } from 'html-classes'
import type { State } from 'watch-state'
import { Compute } from 'watch-state'

import { Delay, For, Link, Show } from '../../../components'
import { useShow } from '../../../hooks'
import type { ChildrenProps } from '../../../types'
import { Ref } from '../../../utils'
import { usePageUpdated } from '../../hooks'
import { menu } from '../../menu'
import { DelayPage, Flex, titleLinks } from '../../ui'
import styles from './MenuLayout.scss'

export function MenuLayout ({ children }: ChildrenProps) {
  const itemClass = { root: styles.item, active: styles.itemSelected }
  const updated = usePageUpdated()

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

      <Show when={new Compute(() => titleLinks.value.size > 1)}>
        <aside class={styles.submenu}>
          <div class={styles.submenuTitle}>
            On this page
          </div>
          {() => {
            const hidden = new Ref<State<boolean>>()
            const list = titleLinks.value

            function Content () {
              const show = useShow()

              return (
                <Flex
                  vertical gap={8} class={() => classes([
                    styles.submenuContent,
                    show.value && styles.submenuShow,
                    hidden.value?.value && styles.submenuHide,
                  ])}
                >
                  <For of={list} key='id'>
                    {(value) => (
                      <Link href={`#${value.id}`} class={styles.subItem}>{value.title}</Link>
                    )}
                  </For>
                </Flex>
              )
            }

            return (
              <Delay ref={hidden} show={updated ? 300 : 0} hide={300}>
                <Content />
              </Delay>
            )
          }}
        </aside>
      </Show>
    </DelayPage>
  )
}
