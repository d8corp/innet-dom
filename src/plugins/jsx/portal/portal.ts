import { JSXPluginElement } from '@innet/jsx'
import innet from 'innet'

import { TargetElements } from '../../../types'
import { setParent } from '../../../utils'

export interface PortalProps {
  parent: TargetElements | DocumentFragment
}

export function portal ({ props, children }: JSXPluginElement<PortalProps>, handler) {
  const childrenHandler = Object.create(handler)
  setParent(childrenHandler, props.parent)

  return innet(children, childrenHandler)
}
