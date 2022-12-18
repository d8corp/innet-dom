import { JSXPluginElement } from '@innet/jsx'
import innet from 'innet'

import { TargetElements } from '../../../types'
import { getComment } from '../../../utils'

export interface PortalProps {
  parent: TargetElements | DocumentFragment
}

export function portal ({ props, children }: JSXPluginElement<PortalProps>, handler) {
  const [childHandler] = getComment(handler, 'portal', false, props.parent)

  return innet(children, childHandler)
}
