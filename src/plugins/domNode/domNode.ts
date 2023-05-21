import { type HandlerPlugin, useApp } from 'innet'

import { useParent } from '../../hooks'
import { append } from '../../utils'

export function domNode (): HandlerPlugin {
  return () => {
    append(useParent(), useApp<HTMLElement>())
  }
}
