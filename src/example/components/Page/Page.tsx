import { classes } from 'html-classes'
import type { State } from 'watch-state'

import { Delay } from '../../../components'
import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import { Ref } from '../../../utils'
import $styles from './Page.module.scss'

export type PageProps = HTMLStyleProps<HTMLDivElement, typeof $styles>

export function Page (props: PageProps) {
  const hidden = new Ref<State<boolean>>()
  const styles = useStyles($styles)

  return (
    <Delay show={300} hide={300} ref={hidden}>
      <div {...props} class={() => classes([styles.root, hidden.value?.value && styles.hidden])} />
    </Delay>
  )
}
