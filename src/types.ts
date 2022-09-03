import { Handler } from 'innet'

export type ContentElements = TargetElements | Text
export type TargetElements = Element | Comment

export type UseComment = [Handler, Comment]

export type HTMLProps<E extends HTMLElement = HTMLElement> = Omit<Partial<E>, 'style'> & { style?: string }

declare global {
  interface Comment {
    _children: ContentElements[]
    _parent?: Comment
  }

  interface Element {
    _parent?: Comment
  }

  interface Text {
    _parent?: Comment
  }
}
