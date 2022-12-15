import { JSXPluginElement } from '@innet/jsx'
import innet from 'innet'

import { StateProp } from '../../../types'
import { use } from '../../../utils'

export interface ShowProps {
  state: StateProp<any>
}

export function show ({ props: { state }, children }: JSXPluginElement<ShowProps>, handler) {
  return innet(() => use(state) ? children : null, handler)
}
