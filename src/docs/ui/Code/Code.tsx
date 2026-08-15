import { classes } from 'html-classes'
import { State } from 'watch-state'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import classNames from './Code.module.scss'

export type CodeProps = HTMLStyleProps

export function Code ({ onclick, ...props }: CodeProps) {
  const styles = useStyles(classNames)
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

  const root = () => classes([styles.root, copied.value && styles.copied])

  return (
    <code
      {...props}
      class={root}
      onclick={handleClick}
    />
  )
}
