import { type Handler } from 'innet'
import { onDestroy } from 'watch-state'

import { append, remove } from '../dom'
import { getParent } from '../getParent'
import { setParent } from '../setParent'

import { type UseComment } from '../../types'

export function getComment (handler: Handler, name: string, freeParent = false, parent = getParent(handler)): UseComment {
  const comment = document.createComment(name)
  const childHandler = Object.create(handler)
  setParent(childHandler, comment)
  append(parent, comment)

  if (!freeParent) {
    onDestroy(() => { remove(comment) })
  }

  return [childHandler, comment]
}
