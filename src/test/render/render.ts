import innet from 'innet'

import { handler as defaultHandler } from '../../handler'
import { setParent } from '../../utils'

export function render (app, handler = defaultHandler) {
  const parent = document.createDocumentFragment()
  const childrenHandler = Object.create(handler)
  setParent(childrenHandler, parent)

  innet(app, childrenHandler)
  return parent
}
