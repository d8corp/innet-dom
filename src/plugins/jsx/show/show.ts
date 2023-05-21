import { type JSXPluginElement } from '@innet/jsx'
import innet, { useApp, useHandler } from 'innet'

import { type StateProp } from '../../../types'
import { inject } from '../../../utils'

export interface ShowProps {
  when: StateProp<any>
}

export function show () {
  const handler = useHandler()
  const { props: { when }, children } = useApp<JSXPluginElement<ShowProps>>()
  innet(inject(when, state => state ? children : null), handler)
}
