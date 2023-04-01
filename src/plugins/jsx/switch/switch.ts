import { getSlots, type JSXPluginElement } from '@innet/jsx'
import innet from 'innet'

import { type StateProp } from '../../../types'
import { inject } from '../../../utils'

export interface SwitchProps {
  of: StateProp<string | number>
}

export function switchPlugin ({ props: { of }, children }: JSXPluginElement<SwitchProps>, handler) {
  const slots = getSlots(handler, children)
  return innet(inject(of, state => slots[state] ?? slots['']), handler)
}
