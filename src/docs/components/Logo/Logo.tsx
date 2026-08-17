import type { HTMLProps } from '../../../types'
import logo from './logo.svg'

export function Logo (props: HTMLProps<HTMLImageElement>) {
  return (
    <img src={logo} {...props} />
  )
}
