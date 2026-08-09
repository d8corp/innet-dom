import { Compute } from 'watch-state'

import { Flex, type FlexProps } from '../Flex'

import { Show, useHidden } from '../../../components'
import { style, useShow } from '../../../hooks'
import type { StateProp } from '../../../types'
import { use } from '../../../utils'
import styles from './Title.scss'

const useStyle = style(styles)

export interface TitleProps extends FlexProps<'h1'> {
  h?: 1 | 2 | 3 | 4 | 5 | 6
  title?: string
  subtitle?: StateProp<string>
}

export function Title ({
  h = 1,
  title,
  subtitle,
  children = title,
  ...props
}: TitleProps = {}) {
  const show = useShow()
  const hide = useHidden()
  const styles = useStyle()
  const showSubtitle = subtitle ? new Compute(() => Boolean(use(subtitle))) : null

  if (h === 1 && title !== undefined) {
    document.title = title
  }

  return (
    <Flex
      element={`h${h}`}
      wrap
      {...props}
      class={() => [
        styles.root,
        show.value && styles.show,
        hide?.value && styles.hide,
      ]}
    >
      {children}
      <Show when={showSubtitle}>
        <div class={() => styles.subTitle}>
          {subtitle}
        </div>
      </Show>
    </Flex>
  )
}
