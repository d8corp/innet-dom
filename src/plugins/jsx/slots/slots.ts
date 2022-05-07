import innet from 'innet'

import { Context, createContextHandler } from '../context'
import { getSlots } from '../slot'

export interface SlotsProps {
  from: any
}

export const slotsContext = new Context({})

export function slots ({ props: { from }, children }, handler) {
  return innet(children, createContextHandler(handler, slotsContext, getSlots(handler, from)))
}
