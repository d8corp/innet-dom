import { JSXPluginElement } from '@innet/jsx'
import innet from 'innet'
import { Cache, State } from 'watch-state'

import { WatchProp } from '../../../types'
import { use } from '../../../utils'

export interface ShowProps {
  state: WatchProp<any> | State | Cache
}

export function show ({ props: { state }, children }: JSXPluginElement<ShowProps>, handler) {
  const value = state instanceof State || state instanceof Cache ? () => state.value : state

  return innet(() => use(value) ? children : null, handler)
}
