import { Cache } from 'watch-state'

import { useParams } from '../useParams'

export function useParam<T extends string | undefined> (name: string): Cache<T> {
  const params = useParams()

  return new Cache<T>(() => params.value[name] as T)
}
