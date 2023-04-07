import { type JSXPluginElement } from '@innet/jsx'
import innet, { type Handler } from 'innet'
import { createEvent, onDestroy, State, unwatch, Watch } from 'watch-state'

import { mapIndexContext, mapValueContext } from '../../../hooks'
import { type ContentElements, type StateProp } from '../../../types'
import {
  after,
  before,
  dif,
  getComment,
  getParent,
  prepend,
  remove,
  setParent,
  statePropToWatchProp,
} from '../../../utils'

export interface MapProps<T = any> {
  of: StateProp<T[]>
  key?: keyof T | ((item: T) => any)
}

function getKey (key, value) {
  if (typeof key === 'function') {
    return key(value)
  } else if (key === undefined) {
    return value
  } else {
    return value[key]
  }
}

const watcherKey = Symbol('watcherKey') as unknown as string

export function map <T> ({
  type,
  props: {
    key,
    of: ofState,
  },
  children,
}: JSXPluginElement<MapProps<T>>, handler) {
  if (!children || !ofState) return

  const forProp = statePropToWatchProp(ofState)

  if (typeof forProp === 'function') {
    const [childHandler, mainComment] = getComment(handler, type)

    let keysList = []
    const handlersMap = new Map<any, Handler>()

    onDestroy(() => {
      handlersMap.forEach(({ [watcherKey]: watcher }) => watcher.destroy())
    })

    new Watch(update => {
      const values = forProp(update)

      if (update) {
        const oldKeysList = keysList
        const oldKeysSet = new Set(oldKeysList)
        keysList = values.map(value => getKey(key, value))
        const keepKeys = dif(oldKeysList, keysList)

        for (let index = 0; index < values.length; index++) {
          const value = values[index]
          const valueKey = keysList[index]

          const keep = keepKeys.includes(valueKey)

          if (handlersMap.has(valueKey)) {
            const deepHandler = handlersMap.get(valueKey)

            unwatch(createEvent(() => {
              mapValueContext.get(deepHandler).value = value
              mapIndexContext.get(deepHandler).value = index
            }))

            if (!keep) {
              const comment = getParent(deepHandler) as ContentElements

              if (index) {
                after(getParent(handlersMap.get(keysList[index - 1])), comment)
              } else if (oldKeysList.length) {
                before(getParent(handlersMap.get(oldKeysList[0])), comment)
              } else {
                prepend(mainComment, comment)
              }
            }
          } else {
            const comment = document.createComment(valueKey)
            const deepHandler = Object.create(childHandler)
            setParent(deepHandler, comment)
            deepHandler[mapValueContext.key] = new State(value)
            deepHandler[mapIndexContext.key] = new State(index)
            handlersMap.set(valueKey, deepHandler)

            if (index) {
              after(getParent(handlersMap.get(keysList[index - 1])), comment)
            } else if (oldKeysList.length) {
              before(getParent(handlersMap.get(oldKeysList[0])), comment)
            } else {
              prepend(mainComment, comment)
            }

            deepHandler[watcherKey] = new Watch(() => {
              innet(children, deepHandler)
            }, true)
          }

          oldKeysSet.delete(valueKey)
        }

        oldKeysSet.forEach(valueKey => {
          const deepHandler = handlersMap.get(valueKey)
          handlersMap.delete(valueKey)
          remove(getParent(deepHandler) as ContentElements)
          deepHandler[watcherKey].destroy()
        })
      } else {
        for (let index = 0; index < values.length; index++) {
          const value = values[index]
          const valueKey = getKey(key, value)

          if (handlersMap.has(valueKey)) continue

          keysList.push(valueKey)

          const [deepHandler] = getComment(childHandler, valueKey, true)
          deepHandler[mapValueContext.key] = new State(value)
          deepHandler[mapIndexContext.key] = new State(index)
          handlersMap.set(valueKey, deepHandler)

          deepHandler[watcherKey] = new Watch(() => {
            innet(children, deepHandler)
          }, true)
        }
      }
    })

    return mainComment
  } else {
    const result = []

    let i = 0
    for (const value of forProp) {
      const childrenHandler = Object.create(handler)
      childrenHandler[mapValueContext.key] = value
      childrenHandler[mapIndexContext.key] = i++
      result.push(innet(children, childrenHandler))
    }

    return result
  }
}
