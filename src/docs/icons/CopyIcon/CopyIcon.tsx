import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

export type CopyIconProps = BaseIconProps

export function CopyIcon (props: CopyIconProps) {
  return (
    <BaseIcon {...props}>
      <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
      <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
    </BaseIcon>
  )
}
