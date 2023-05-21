import { type JSXPluginElement } from '@innet/jsx'
import innet, { useApp, useHandler } from 'innet'

import { type TargetElements } from '../../../types'
import { getComment } from '../../../utils'

export interface PortalProps {
  parent: TargetElements | DocumentFragment
}

export function portal () {
  const handler = useHandler()
  const { props, children } = useApp<JSXPluginElement<PortalProps>>()
  const [childHandler] = getComment(handler, 'portal', false, props.parent)

  innet(children, childHandler)
}
