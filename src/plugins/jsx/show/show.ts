import { JSXPluginElement } from '@innet/jsx'
import innet from 'innet'

import { StateProp } from '../../../types'
import { inject, use } from '../../../utils'

export interface ShowProps {
  state: StateProp<any>
}

export function show ({ props: { state }, children }: JSXPluginElement<ShowProps>, handler) {
  return innet(inject(state, state => use(state) ? children : null), handler)
}
