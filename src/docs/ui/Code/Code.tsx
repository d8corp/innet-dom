import { classes } from 'html-classes'
import { State } from 'watch-state'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import $styles from './Code.module.scss'

export type CodeProps = HTMLStyleProps<HTMLElement, typeof $styles>

export function Code ({ onclick, style, ...props }: CodeProps) {
  const styles = useStyles($styles)
  const x = new State('')
  const y = new State('')
  const copied = new State(false)
  let copyTimer: any

  const handleClick = (e: PointerEvent) => {
    navigator.clipboard.writeText((e.target as HTMLDivElement).innerText)
    x.set(e.clientX + 'px')
    y.set(e.clientY + 'px')
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
      style={{
        ...style,
        '--ui-code-x': x,
        '--ui-code-y': y,
      }}
      class={root}
      onclick={handleClick}
    />
  )
}
