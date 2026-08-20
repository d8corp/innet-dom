import { classes } from 'html-classes'

import { useHidden } from '../../../components'
import { useShow } from '../../../hooks'
import { menu } from '../../menu'
import { hideSide } from '../../state'
import { Flex, Link } from '../../ui'
import styles from './Side.module.scss'

export function Side () {
  const show = useShow()
  const hide = useHidden()
  const itemClass = { root: styles.item, active: styles.itemSelected }

  return (
    <Flex
      element='aside'
      vertical
      class={() => classes([
        styles.root,
        show.value && styles.show,
        hide?.value && styles.hide,
      ])}
    >
      <div class={styles.background} onclick={hideSide} />
      <Flex vertical flex gap={24} class={styles.scrollbar}>
        {menu.map(({ title, children }) => (
          <Flex vertical gap={10}>
            <div class={styles.group}>{title}</div>
            <Flex vertical gap={4}>
              {children.map(props => <Link {...props} onclick={hideSide} class={itemClass} />)}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
