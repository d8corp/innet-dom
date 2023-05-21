import { type JSXPluginElement, useSlots } from '@innet/jsx'
import innet, { useApp, useHandler } from 'innet'

import { type StateProp } from '../../../types'
import { inject } from '../../../utils'

export interface SwitchProps {
  of: StateProp<string | number>
}

export function switchPlugin () {
  const handler = useHandler()
  const { props: { of } } = useApp<JSXPluginElement<SwitchProps>>()
  const slots = useSlots()
  innet(inject(of, state => slots[state] ?? slots['']), handler)
}
