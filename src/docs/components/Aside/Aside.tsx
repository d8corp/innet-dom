import { classes } from 'html-classes'
import { scope } from 'watch-state'

import { Delay, For, useHidden } from '../../../components'
import { useShow } from '../../../hooks'
import type { TitleLink } from '../../state'
import { hideAside, titleLinks } from '../../state'
import { Flex, Link } from '../../ui'
import styles from './Aside.module.scss'

interface ContentProps {
  links: Set<TitleLink>
}

function Content ({ links }: ContentProps) {
  const show = useShow()
  const hidden = useHidden()

  return (
    <Flex
      vertical gap={8} class={() => classes([
        styles.content,
        show.value && styles.show,
        hidden?.value && styles.hide,
      ])}
    >
      <For of={links} key='id'>
        {(value) => (
          <Link onclick={hideAside} href={`#${value.id}`} class={styles.item}>{value.title}</Link>
        )}
      </For>
    </Flex>
  )
}

export function Aside () {
  const show = useShow()
  const hidden = useHidden()

  return (
    <Flex
      element='aside'
      vertical
      class={() => classes([
        styles.root,
        show.value && styles.show,
        hidden?.value && styles.hide,
      ])}
    >
      <div class={styles.background} onclick={hideAside} />
      <Flex flex vertical gap={12} class={styles.scrollbar}>
        <div class={styles.title}>
          On this page
        </div>
        {() => (
          <Delay show={scope.activeWatcher?.updated ? 200 : 0} hide={200}>
            <Content links={titleLinks.value} />
          </Delay>
        )}
      </Flex>
    </Flex>
  )
}
