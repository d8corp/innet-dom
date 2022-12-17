import innet, { PluginHandler } from 'innet'
import { Watch } from 'watch-state'

import { setParent, statePropToWatchProp } from '../../utils'

export function domJSX (): PluginHandler {
  return ({ type, props, children }, next, handler) => {
    if (typeof type !== 'string') return next()

    const element = document.createElement(type)

    if (props) {
      for (let key in props) {
        if (key === 'ref') {
          if (props.ref) {
            props.ref.value = element
          }
          continue
        }

        let value = props[key]

        if (key.startsWith('on')) {
          element[key] = value
          continue
        }

        const bothSet = key[0] === '$'
        const fieldSet = bothSet || key[0] === '_'
        const attributeSet = bothSet || !fieldSet

        if (fieldSet) {
          key = key.slice(1)
        }

        value = statePropToWatchProp(value)

        if (typeof value === 'function') {
          new Watch(update => {
            const result = value(update)
            if (fieldSet && element[key] !== result) {
              element[key] = result
            }
            if (attributeSet) {
              if (result === undefined || result === false) {
                if (update) {
                  element.removeAttribute(key)
                }
              } else {
                element.setAttribute(key, result === true ? '' : result)
              }
            }
          })
        } else {
          if (fieldSet) {
            element[key] = value
          }
          if (attributeSet && value !== undefined) {
            element.setAttribute(key, value)
          }
        }
      }
    }

    const result = innet(element, handler)

    if (children) {
      const childrenHandler = Object.create(handler)
      setParent(childrenHandler, element)

      return innet(children, childrenHandler)
    }

    return result
  }
}
