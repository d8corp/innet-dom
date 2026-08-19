import { classes } from 'html-classes'
import { scope } from 'watch-state'

import { Delay, For, useHidden } from '../../../components'
import { useShow } from '../../../hooks'
import type { TitleLink } from '../../ui'
import { Flex, Link, titleLinks } from '../../ui'
import styles from './OnPageMenu.module.scss'

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
          <Link href={`#${value.id}`} class={styles.item}>{value.title}</Link>
        )}
      </For>
    </Flex>
  )
}

export function OnPageMenu () {
  const show = useShow()
  const hidden = useHidden()

  return (
    <aside
      class={() => classes([
        styles.root,
        show.value && styles.show,
        hidden?.value && styles.hide,
      ])}
    >
      <div class={styles.title}>
        On this page
      </div>
      {() => (
        <Delay show={scope.activeWatcher?.updated ? 300 : 0} hide={300}>
          <Content links={titleLinks.value} />
        </Delay>
      )}
    </aside>
  )
}
