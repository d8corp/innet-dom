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
  TxtTableNode,
  TxtTextNode,
} from '@textlint/ast-node-types'
import { parse } from '@textlint/markdown-to-ast'

import { Divider } from '../Divider'
import { Title } from '../Title'

import { Link } from '../../../components'
import type { StateProp } from '../../../types'
import { use } from '../../../utils'

export interface BaseMarkdownProps {
  text?: StateProp<string>
  map?: Partial<Record<ASTNodeTypes | string, (node: any) => JSX.Element>>
}

export function BaseMarkdown ({ text, map }: BaseMarkdownProps) {
  const ast2jsx = (ast: TxtNode) => {
    return currentMap[ast.type as ASTNodeTypes]?.(ast)
  }

  const currentMap: Partial<Record<ASTNodeTypes | string, (node: any) => JSX.Element>> = {
    Document: ({ children }: TxtDocumentNode) => children.map(ast2jsx),
    Paragraph: ({ children }: TxtParagraphNode) => ({
      type: 'p',
      props: {
        children: children?.map(ast2jsx),
      },
    }),
    Str: ({ value }: TxtTextNode) => value,
    Link: ({ url, children }: TxtLinkNode) => ({
      type: Link,
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
        props: { h: depth, title: text, children: text ? undefined : jsxChildren, link: depth < 3 },
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
    CodeBlock: ({ value }: TxtCodeBlockNode) => ({
      type: 'pre',
      props: {
        children: value,
      },
    }),
    Image: ({ alt, url }: TxtImageNode) => ({
      type: 'img',
      props: {
        alt,
        src: url,
      },
    }),
    Table: ({ children: [header, ...rows] }: TxtTableNode) => ({
      type: 'table',
      props: {
        children: [
          {
            type: 'thead',
            props: {
              children: [{
                type: 'tr',
                props: {
                  children: header.children.map(({ children }) => ({
                    type: 'th',
                    props: {
                      children: children?.map(ast2jsx),
                    },
                  })),
                },
              }],
            },
          },
          {
            type: 'tbody',
            props: {
              children: rows?.map(({ children }) => ({
                type: 'tr',
                props: {
                  children: children.map(({ children }) => ({
                    type: 'td',
                    props: {
                      children: children?.map(ast2jsx),
                    },
                  })),
                },
              })),
            },
          },
        ],
      },
    }),
    ...map,
  }

  if (!text) return

  if (typeof text === 'string') {
    return ast2jsx(parse(text))
  }

  return () => ast2jsx(parse(use(text)))
}
