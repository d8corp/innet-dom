import type { StateProp } from '../../types'
import { inject } from '../../utils'

export interface ShowProps {
  when: StateProp<any>
  children?: JSX.Element
  fallback?: JSX.Element
}

export function Show ({ when, children, fallback = null }: ShowProps) {
  return inject(when, state => state ? children : fallback)
}
