import { Context, useContext } from '@innet/jsx'

const mapIndexUnknown = Symbol('mapIndexUnknown')
export const mapIndexContext = new Context(mapIndexUnknown)

export function useMapIndex <V> (): V {
  const index = useContext(mapIndexContext)

  if (index === mapIndexUnknown) {
    throw Error('useMapIndex should be used inside <map>...</map>')
  }

  return index
}
