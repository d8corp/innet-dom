import { JSXPluginElement } from '@innet/jsx'
import innet, { Handler } from 'innet'

import { slotsContext } from '../slots/constants'

export interface SlotProps {
  name?: string
}

export function getSlots (handler: Handler, from): Record<string, any> {
  const result = {}

  for (let i = 0; i < from.length; i++) {
    const child = from[i]

    if (child && typeof child === 'object' && !Array.isArray(child)) {
      const { type, props, children } = child

      if (typeof type === 'string' && handler[type] === slot) {
        const name = props?.name || ''

        if (name in result) {
          result[name].push(...children)
        } else {
          result[name] = children
        }

        continue
      }
    }

    if ('' in result) {
      result[''].push(child)
    } else {
      result[''] = [child]
    }
  }

  return result
}

export function slot ({ props, children }: JSXPluginElement<SlotProps>, handler) {
  const slots = slotsContext.get(handler)
  const name = props?.name || ''
  return innet(name in slots ? slots[name] : children, handler)
}
