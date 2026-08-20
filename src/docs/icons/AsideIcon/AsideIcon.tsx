import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

export type AsideIconProps = BaseIconProps

export function AsideIcon (props: AsideIconProps) {
  return (
    <BaseIcon {...props}>
      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
      <path d='M15 3v18' />
    </BaseIcon>
  )
}
