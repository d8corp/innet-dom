import { type JSXPluginElement } from '@innet/jsx'
import innet, { useApp, useHandler } from 'innet'

import { type StateProp } from '../../../types'
import { inject, use } from '../../../utils'

export interface HideProps {
  when: StateProp<any>
}

export function hide () {
  const { props: { when }, children } = useApp<JSXPluginElement<HideProps>>()
  const handler = useHandler()

  innet(inject(when, state => use(state) ? null : children), handler)
}
