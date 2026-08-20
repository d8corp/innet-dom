import type { HTMLProps, StateProp } from '../../../types'
import { inject } from '../../../utils'

export interface BaseIconProps extends HTMLProps<SVGSVGElement> {
  size?: StateProp<number | string>
}

export function BaseIcon ({ size = '1em', ...props }: BaseIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={inject(size, String)}
      height={inject(size, String)}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
      {...props}
    />
  )
}
