import type { LinkProps } from '../../../components'
import { Link } from '../../../components'
import type { HTMLStyleProps } from '../../../hooks'
import { style } from '../../../hooks'
import type { StateProp } from '../../../types'
import { inject } from '../../../utils'
import styles from './Flex.scss'

export interface FlexStyles {
  root: string
}

const useStyle = style(styles)

export const alignJustifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
} as const

export const alignMap = {
  ...alignJustifyMap,
  baseline: 'baseline',
} as const

export const justifyMap = {
  ...alignMap,
  between: 'space-between',
  around: 'space-around',
} as const

export type FlexElement = keyof HTMLElementTagNameMap
export interface BaseFlexProps {
  vertical?: StateProp<boolean>
  align?: keyof typeof alignMap
  justify?: keyof typeof justifyMap
  gap?: number | [number, number]
  flex?: number | boolean
  wrap?: boolean
  inline?: boolean
  reverse?: boolean
  padding?: number | [number, number] | [number, number, number] | [number, number, number, number]
}

export type FlexProps<T extends FlexElement = 'div', S extends FlexStyles = FlexStyles> = HTMLStyleProps<HTMLElementTagNameMap[T], S> & {
  element?: T
} & BaseFlexProps & (T extends 'a' ? LinkProps : object)

export function Flex<T extends FlexElement = 'div', S extends FlexStyles = FlexStyles> ({
  vertical,
  align,
  justify,
  gap,
  flex,
  wrap,
  inline,
  reverse,
  style,
  padding,
  element = 'div' as T,
  ...props
}: FlexProps<T, S>) {
  const styles = useStyle()
  const Element = element === 'a' ? Link as any : element as string

  return (
    <Element
      {...props as any}
      style={{
        ...style,
        '--ui-flex-justify': justify && justify !== 'start' ? justifyMap[justify] : '',
        '--ui-flex-align': align && align !== 'start' ? alignMap[align as keyof typeof alignMap] : '',
        '--ui-flex-wrap': wrap ? 'wrap' : '',
        '--ui-flex-flex': String(flex === true ? 1 : flex || ''),
        '--ui-flex': inline ? 'inline-flex' : '',
        '--ui-flex-direction': inject(vertical, vertical => vertical ? (reverse ? 'column-reverse' : 'column') : reverse ? 'row-reverse' : ''),
        '--ui-flex-padding': !padding ? '' : Array.isArray(padding) ? `${padding.join('px ')}px` : `${padding}px`,
        '--ui-flex-gap': !gap ? '' : Array.isArray(gap) ? `${gap[0]}px ${gap[1]}px` : `${gap}px`,
      }}
      class={() => styles.root}
    />
  )
}
