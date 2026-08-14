import { classes } from 'html-classes'
import { State } from 'watch-state'

import type { HTMLStyleProps } from '../../../hooks'
import { style } from '../../../hooks'
import styles from './Code.scss'

const useStyles = style(styles)

export type CodeProps = HTMLStyleProps

export function Code ({ onclick, ...props }: CodeProps) {
  const styles = useStyles()
  const copied = new State(false)
  let copyTimer: any

  const handleClick = (e: Event) => {
    navigator.clipboard.writeText((e.target as HTMLDivElement).innerText)
    copied.value = true

    clearTimeout(copyTimer)

    copyTimer = setTimeout(() => {
      copied.value = false
    }, 1000)

    // @ts-expect-error: this
    onclick?.(e)
  }

  return <code {...props} class={() => classes([styles.root, copied.value && styles.copied])} onclick={handleClick} />
}
