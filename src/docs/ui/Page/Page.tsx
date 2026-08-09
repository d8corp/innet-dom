import { locationHash } from '@watch-state/history-api'
import { classes } from 'html-classes'
import { onDestroy } from 'watch-state'
import { scrollTo } from 'web-scroll'

import type { FlexProps, FlexStyles } from '../Flex'
import { Flex } from '../Flex'

import { Delay, useHidden } from '../../../components'
import { style, useShow } from '../../../hooks'
import styles from './Page.scss'

const useStyle = style(styles)

export interface PageStyles extends FlexStyles {
  hide: string
  show: string
}

export type PageProps = FlexProps<'div', PageStyles>

export interface DelayPageProps extends PageProps {
  show?: number
  hide?: number
}

export function DelayPage ({
  show = 200,
  hide = 200,
  children,
  ...props
}: DelayPageProps = {}) {
  return (
    <Delay hide={hide} show={show}>
      <Page {...props}>
        {children}
      </Page>
    </Delay>
  )
}

export function Page (props: PageProps) {
  const styles = useStyle()
  const show = useShow()
  const hidden = useHidden()

  const timer = setTimeout(() => {
    const hash = locationHash.raw

    if (hash) {
      scrollTo(`#${hash}`)
    }
  }, 300)

  onDestroy(() => clearTimeout(timer))

  return (
    <Flex
      vertical
      align='stretch'
      flex
      {...props}
      class={() => classes([
        styles.root,
        show.value && styles.show,
        hidden?.value && styles.hide,
      ])}
    />
  )
}
