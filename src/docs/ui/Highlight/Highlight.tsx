import { classes } from 'html-classes'
import Prism from 'prismjs'
import { State, Watch } from 'watch-state'

import { Dot } from '../Dot'
import type { FlexElement, FlexProps } from '../Flex'
import { Flex } from '../Flex'

import { style, useEffect } from '../../../hooks'
import { Ref } from '../../../utils'
import { CopyIcon, SuccessIcon } from '../../icons'
import styles from './Highlight.scss'

const useStyle = style(styles)

export type HighlightProps<T extends FlexElement = 'div'> = FlexProps<T> & {
  code: string
  lang: string
}

export function Highlight<T extends FlexElement = 'div'> ({
  code,
  lang,
  ...props
}: HighlightProps<T>) {
  const styles = useStyle()
  const ref = new Ref<HTMLPreElement>()
  const copied = new State(false)
  let copyTimer: any

  const hasLand = lang in Prism.languages

  const rawData = code.trim().split('//!').map((line, index) => {
    if (!index) return ['', line]

    const titleRaw = line.split('\n', 1)[0]
    const code = line.slice(titleRaw.length)
    const title = titleRaw.trim()

    return [title, code]
  })

  const [[, sharedCode], ...tabs] = rawData.length > 1 ? rawData : [['', ''], ...rawData]

  const hasTabs = Boolean(sharedCode) || Boolean(tabs.length > 1)

  const IconCopy = () => () => {
    return copied.value ? <SuccessIcon /> : <CopyIcon size={24} />
  }

  const Content = () => {
    if (!hasTabs) {
      const codeText = tabs[0][1].trim()

      if (hasLand) {
        useEffect(() => {
          if (ref.value) {
            ref.value.innerHTML = Prism.highlight(codeText, Prism.languages[lang], lang)
          }
        })
      }

      const copy = () => {
        navigator.clipboard.writeText(codeText)
        copied.value = true

        clearTimeout(copyTimer)

        copyTimer = setTimeout(() => {
          copied.value = false
        }, 1000)
      }

      return (
        <>
          <Flex padding={[12, 16]} class={() => styles.title} gap={12} align='center'>
            <Flex gap={6}>
              <Dot color='error' />
              <Dot color='warning' />
              <Dot color='success' />
            </Flex>
            <Flex flex>
              {tabs.length === 1 ? tabs[0][0] : tabs[1][0]}
            </Flex>
            <button class={styles.copy} onclick={copy}>
              <IconCopy />
            </button>
          </Flex>
          <pre class={() => classes([styles.code, `language-${lang}`])} ref={ref}>
            {!hasLand && codeText}
          </pre>
        </>
      )
    }

    const tab = new State(0)
    let fullCode = ''

    const copy = () => {
      navigator.clipboard.writeText(fullCode)
      copied.value = true

      clearTimeout(copyTimer)

      copyTimer = setTimeout(() => {
        copied.value = false
      }, 1000)
    }

    useEffect(() => {
      new Watch(() => {
        if (!ref.value) return

        const [, currentCode] = tabs[tab.value]
        fullCode = sharedCode ? `${sharedCode}${currentCode.trim()}` : currentCode.trim()

        ref.value.innerHTML = hasLand ? Prism.highlight(fullCode, Prism.languages[lang], lang) : fullCode
      })
    })

    return (
      <>
        <Flex padding={[12, 16]} class={() => styles.title} gap={12} align='center'>
          <Flex flex class={() => styles.tabs}>
            {tabs.map(([title], index) => (
              <span
                class={() => classes([styles.tab, index === tab.value && styles.selected])}
                onclick={() => tab.set(index)}
              >
                {title}
              </span>
            ))}
          </Flex>
          <button class={styles.copy} onclick={copy}>
            <IconCopy />
          </button>
        </Flex>
        <pre class={() => classes([styles.code, `language-${lang}`])} ref={ref} />
      </>
    )
  }

  return (
    <Flex<T> vertical {...(props as any)} class={() => styles.root}>
      <Content />
    </Flex>
  )
}
