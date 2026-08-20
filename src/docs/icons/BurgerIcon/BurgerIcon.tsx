import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'
export type BurgerIconProps = BaseIconProps

export function BurgerIcon (props: BurgerIconProps) {
  return (
    <BaseIcon {...props}>
      <path d='M4 6h16' />
      <path d='M4 12h16' />
      <path d='M4 18h16' />
    </BaseIcon>
  )
}
