import { Context, useContext } from '@innet/jsx'
import type { State } from 'watch-state'

/**
 * @experimental
 * */
export const forValueContext = new Context<State>()

/**
 * @experimental
 * */
export function useForValue<T> (): State<T> {
  const value = useContext(forValueContext)

  if (!value) throw new Error('useForValue must be used within dynamic list of For values')

  return value as State<T>
}
