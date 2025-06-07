import { EMPTY } from '@innet/jsx'
import innet, { useHandler } from 'innet'

import type { TargetElements } from '../../types'
import { getComment } from '../../utils'

export interface PortalProps {
  parent: TargetElements | DocumentFragment
  children?: JSX.Element
}

export function Portal ({ parent, children }: PortalProps) {
  const handler = useHandler()
  const [childHandler] = getComment(handler, 'portal', false, parent)

  innet(children, childHandler)

  return EMPTY
}
