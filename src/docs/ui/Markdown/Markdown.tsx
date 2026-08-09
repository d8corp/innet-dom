import type {
  ASTNodeTypes,
  TxtBlockQuoteNode,
  TxtCodeBlockNode,
  TxtCodeNode,
  TxtDeleteNode,
  TxtDocumentNode,
  TxtEmphasisNode,
  TxtHeaderNode,
  TxtImageNode,
  TxtLinkNode,
  TxtListItemNode,
  TxtListNode,
  TxtNode,
  TxtParagraphNode,
  TxtStrongNode,
  TxtTableCellNode,
  TxtTableNode,
  TxtTableRowNode,
  TxtTextNode,
} from '@textlint/ast-node-types'
import { parse } from '@textlint/markdown-to-ast'

import { Divider } from '../Divider'
import { Highlight } from '../Highlight'
import { Title } from '../Title'

import type { StateProp } from '../../../types'
import { use } from '../../../utils'

export interface MarkdownProps {
  text?: StateProp<string>
}

const astMap: Partial<Record<ASTNodeTypes | string, (node: any) => JSX.Element>> = {
  Document: ({ children }: TxtDocumentNode) => children.map(ast2jsx),
  Paragraph: ({ children }: TxtParagraphNode) => ({
    type: 'p',
    props: {
      children: children?.map(ast2jsx),
    },
  }),
  Str: ({ value }: TxtTextNode) => value,
  Link: ({ url, children }: TxtLinkNode) => ({
    type: 'a',
    props: {
      href: url,
      children: children?.map(ast2jsx),
    },
  }),
  List: ({ children, ordered }: TxtListNode) => ({
    type: ordered ? 'ol' : 'ul',
    props: {
      children: children?.map(ast2jsx),
    },
  }),
  ListItem: ({ children }: TxtListItemNode) => ({
    type: 'li',
    props: {
      children: children?.map(ast2jsx),
    },
  }),
  Header: ({ children, depth }: TxtHeaderNode) => {
    const jsxChildren = children?.map(ast2jsx)
    const text = jsxChildren?.length === 1 && typeof jsxChildren[0] === 'string' ? jsxChildren[0] : undefined

    return ({
      type: Title,
      props: { h: depth, title: text, children: text ? undefined : jsxChildren },
    })
  },
  HorizontalRule: () => ({
    type: Divider,
  }),
  Strong: ({ children }: TxtStrongNode) => ({
    type: 'strong',
    props: { children: children?.map(ast2jsx) },
  }),
  Emphasis: ({ children }: TxtEmphasisNode) => ({
    type: 'em',
    props: { children: children?.map(ast2jsx) },
  }),
  Delete: ({ children }: TxtDeleteNode) => ({
    type: 's',
    props: { children: children?.map(ast2jsx) },
  }),
  BlockQuote: ({ children }: TxtBlockQuoteNode) => ({
    type: 'blockquote',
    props: { children: children?.map(ast2jsx) },
  }),
  Code: ({ value }: TxtCodeNode) => ({
    type: 'code',
    props: { children: value },
  }),
  CodeBlock: ({ value, lang }: TxtCodeBlockNode) => lang
    ? ({
        type: Highlight,
        props: {
          code: value,
          lang,
        },
      })
    : ({
        type: 'pre',
        props: {
          class: 'language-',
          children: [value],
        },
      }),
  Image: ({ alt, url }: TxtImageNode) => ({
    type: 'img',
    props: {
      alt,
      src: url,
    },
  }),
  Table: ({ children }: TxtTableNode) => ({
    type: 'table',
    props: { children: children?.map(ast2jsx) },
  }),
  TableHeader: ({ children }: TxtTableNode) => ({
    type: 'th',
    props: { children: children?.map(ast2jsx) },
  }),
  TableRow: ({ children }: TxtTableRowNode) => ({
    type: 'tr',
    props: { children: children?.map(ast2jsx) },
  }),
  TableCell: ({ children }: TxtTableCellNode) => ({
    type: 'td',
    props: { children: children?.map(ast2jsx) },
  }),
}

function ast2jsx (ast: TxtNode) {
  return astMap[ast.type as ASTNodeTypes]?.(ast)
}

export function Markdown ({ text }: MarkdownProps) {
  if (!text) return

  if (typeof text === 'string') {
    return ast2jsx(parse(text))
  }

  return () => ast2jsx(parse(use(text)))
}
