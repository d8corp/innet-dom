import { type StateProp } from '../../types'
import { inject } from '../inject'

export function injectPx (value?: StateProp<undefined | number | number[]>) {
  return inject(value, value => (
    typeof value === 'number'
      ? `${value}px`
      : Array.isArray(value)
        ? value.join('px ') + 'px'
        : ''
  ))
}
