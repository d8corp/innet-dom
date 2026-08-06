import { Context, useContext } from '@innet/jsx'
import type { State } from 'watch-state'

/**
 * @experimental
 * */
export const forIndexContext = new Context<State<number>>()

/**
 * @experimental
 * */
export function useForIndex () {
  const value = useContext(forIndexContext)

  if (!value) throw new Error('useForValue must be used within dynamic list of For values')

  return value
}
