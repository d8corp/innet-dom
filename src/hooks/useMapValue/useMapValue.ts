import { Context, useContext } from '@innet/jsx'

import { type StateProp } from '../../types'

const mapValueUnknown = Symbol('mapValueUnknown')
export const mapValueContext = new Context(mapValueUnknown)

export function useMapValue <V> (): StateProp<V> {
  const value = useContext(mapValueContext)

  if (value === mapValueUnknown) {
    throw Error('useMapValue should be used inside <map>...</map>')
  }

  return value
}
