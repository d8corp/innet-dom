import { Context, useContext } from '@innet/jsx'

import { type ObservableProp } from '../../types'

const mapValueUnknown = Symbol('mapValueUnknown')
export const mapValueContext = new Context<ObservableProp<any>>(mapValueUnknown)

export function useMapValue <V> (): ObservableProp<V> {
  const value = useContext(mapValueContext)

  if (value === mapValueUnknown) {
    throw Error('useMapValue should be used inside <map>...</map>')
  }

  return value
}
