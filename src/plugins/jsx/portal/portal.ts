import innet from 'innet'

import { setParent } from '../../../utils'

export interface PortalProps {
  parent: Node
}

export function portal ({ props, children }, handler) {
  const childrenHandler = Object.create(handler)
  setParent(childrenHandler, props.parent)

  return innet(children, childrenHandler)
}
