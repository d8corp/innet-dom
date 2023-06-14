import { Context, useContext } from '@innet/jsx'

import { type ObservableProp } from '../../types'

const mapIndexUnknown = Symbol('mapIndexUnknown')
export const mapIndexContext = new Context(mapIndexUnknown)

export function useMapIndex (): ObservableProp<number> {
  const index = useContext(mapIndexContext)

  if (index === mapIndexUnknown) {
    throw Error('useMapIndex should be used inside <map>...</map>')
  }

  return index
}
