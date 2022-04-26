import { ContentElements, TargetElements } from '../../types'

function removeParentChild (target: ContentElements) {
  if (target._parent) {
    const children = target._parent._children
    children.splice(children.indexOf(target), 1)
    target._parent = undefined
  }
}
function removeElements (target: ContentElements) {
  target.remove()
  if (target instanceof Comment) {
    clear(target)
  }
}
function updateChildren (target: ContentElements) {
  if (target instanceof Comment) {
    if (target._children) {
      target.before.apply(target, target._children)
      target._children.forEach(updateChildren)
    } else {
      target._children = []
    }
  }
}
function insertChild (target: TargetElements, node: ContentElements, offset = 0) {
  if (target._parent) {
    const parent = node._parent = target._parent
    parent._children.splice(parent._children.indexOf(target) - offset, 0, node)
  }
}

export function clear (target: Comment) {
  target._children.forEach(removeElements)
  target._children = []
}
export function remove (target: ContentElements) {
  removeParentChild(target)
  removeElements(target)
}
export function before (target: TargetElements, node: ContentElements) {
  removeParentChild(node)
  insertChild(target, node, 1)
  if (target instanceof Comment) {
    (target._children[0] || target).before(node)
  } else {
    target.before(node)
  }
  updateChildren(node)
}
export function prepend (target: TargetElements | DocumentFragment, node: ContentElements) {
  removeParentChild(node)
  if (target instanceof Comment) {
    node._parent = target
    if (!target._children) {
      target._children = []
    }
    target._children.unshift(node);
    (target._children[1] || target).before(node)
  } else {
    target.prepend(node)
  }
  updateChildren(node)
}
export function append (target: TargetElements | DocumentFragment, node: ContentElements) {
  removeParentChild(node)
  if (target instanceof Comment) {
    node._parent = target
    if (!target._children) {
      target._children = []
    }
    target._children.push(node)
    target.before(node)
  } else {
    target.appendChild(node)
  }
  updateChildren(node)
}
export function after (target: TargetElements, node: ContentElements) {
  removeParentChild(node)
  insertChild(target, node)
  target.after(node)
  updateChildren(node)
}
