import { JSXPluginElement } from '@innet/jsx'
import innet from 'innet'

import { createContextHandler } from '../context'
import { getSlots } from '../slot'
import { slotsContext } from './constants'

export interface SlotsProps {
  from: any
}

export function slots ({ props: { from }, children }: JSXPluginElement<SlotsProps>, handler) {
  return innet(children, createContextHandler(handler, slotsContext, getSlots(handler, from)))
}
