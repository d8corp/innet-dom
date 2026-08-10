import type { HTMLProps } from '../../../types'

export interface SuccessIconProps extends HTMLProps<SVGSVGElement> {
  size?: number
}

export function SuccessIcon ({ size = 16, ...props }: SuccessIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={String(size)}
      height={String(size)}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
      {...props}
    >
      <path d='M20 6L9 17l-5-5' />
    </svg>
  )
}
