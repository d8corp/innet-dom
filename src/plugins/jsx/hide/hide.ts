import { type JSXPluginElement } from '@innet/jsx'
import innet from 'innet'

import { type StateProp } from '../../../types'
import { inject, use } from '../../../utils'

export interface HideProps {
  when: StateProp<any>
}

export function hide ({ props: { when }, children }: JSXPluginElement<HideProps>, handler) {
  return innet(inject(when, state => use(state) ? null : children), handler)
}
