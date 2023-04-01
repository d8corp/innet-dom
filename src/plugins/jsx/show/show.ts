import { type JSXPluginElement } from '@innet/jsx'
import innet from 'innet'

import { type StateProp } from '../../../types'
import { inject, use } from '../../../utils'

export interface ShowProps {
  when: StateProp<any>
}

export function show ({ props: { when }, children }: JSXPluginElement<ShowProps>, handler) {
  return innet(inject(when, state => use(state) ? children : null), handler)
}
