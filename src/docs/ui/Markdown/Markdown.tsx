import type { TxtCodeBlockNode } from '@textlint/ast-node-types'

import { Highlight } from '../Highlight/Highlight'
import type { BaseMarkdownProps } from './BaseMarkdown'
import { BaseMarkdown } from './BaseMarkdown'

export type MarkdownProps = BaseMarkdownProps

export function Markdown ({ text, map }: MarkdownProps) {
  if (!text) return

  return (
    <BaseMarkdown
      text={text}
      map={{
        ...map,
        CodeBlock: ({ value, lang }: TxtCodeBlockNode) => ({
          type: Highlight,
          props: {
            code: value,
            lang,
          },
        }),
      }}
    />
  )
}
