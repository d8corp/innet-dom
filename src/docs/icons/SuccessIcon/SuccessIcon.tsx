import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

export type SuccessIconProps = BaseIconProps

export function SuccessIcon (props: SuccessIconProps) {
  return (
    <BaseIcon {...props}>
      <path d='M20 6L9 17l-5-5' />
    </BaseIcon>
  )
}
