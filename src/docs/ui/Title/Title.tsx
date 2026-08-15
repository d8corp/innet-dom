import { Compute, onDestroy, State } from 'watch-state'

import { Flex, type FlexProps } from '../Flex'
import { Link } from '../Link'

import { Show, useHidden } from '../../../components'
import { useShow, useStyles } from '../../../hooks'
import type { StateProp } from '../../../types'
import { use } from '../../../utils'
import { LinkIcon } from '../../icons'
import { slugify } from '../../utils'
import $styles from './Title.module.scss'

const linkSize: Record<1 | 2 | 3 | 4 | 5 | 6, number> = {
  1: 32,
  2: 24,
  3: 14,
  4: 12,
  5: 12,
  6: 12,
}

export interface TitleLink {
  id: string
  title?: string
}

export const titleLinks = new State(new Set<TitleLink>())
let updateLinks: symbol

const updateTitleLinks = () => {
  const id = updateLinks = Symbol('')

  queueMicrotask(() => {
    if (id === updateLinks) {
      titleLinks.update()
    }
  })
}

export interface TitleProps extends FlexProps<'h1'> {
  h?: 1 | 2 | 3 | 4 | 5 | 6
  title?: string
  subtitle?: StateProp<string>
  link?: boolean
  id?: string
}

export function Title ({
  h = 1,
  title,
  subtitle,
  children = title,
  link,
  id = title && link ? slugify(title) : undefined,
  ...props
}: TitleProps = {}) {
  const show = useShow()
  const hide = useHidden()
  const styles = useStyles($styles)
  const showSubtitle = subtitle ? new Compute(() => Boolean(use(subtitle))) : null

  if (h === 1 && title !== undefined) {
    document.title = title
  }

  if (id) {
    const link: TitleLink = { id, title }
    titleLinks.raw.add(link)

    onDestroy(() => {
      titleLinks.raw.delete(link)
    })

    updateTitleLinks()
  }

  return (
    <Flex
      element={`h${h}`}
      wrap
      {...props}
      id={id}
      class={() => [
        styles.root,
        title && link && styles.withLink,
        show.value && styles.show,
        hide?.value && styles.hide,
      ]}
    >
      {children}
      {title && link && (
        <Link class={styles.link} href={`#${slugify(title)}`}><LinkIcon size={linkSize[h]} /></Link>
      )}
      <Show when={showSubtitle}>
        <div class={styles.subTitle}>
          {subtitle}
        </div>
      </Show>
    </Flex>
  )
}
