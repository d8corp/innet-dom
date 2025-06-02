import { Context, useContext } from '@innet/jsx'
import { type State } from 'watch-state'

export const paramsContext = new Context<State<Record<string, string>>>()

export function useParams<T extends Record<string, string>> (): State<T> {
  const params = useContext(paramsContext)

  if (!params) {
    throw Error('useParams must be used in Router')
  }

  return params as State<T>
}
