import { EMPTY } from '@innet/jsx'
import innet, { type Handler, useHandler } from 'innet'
import { createEvent, onDestroy, State, unwatch, Watch } from 'watch-state'

import { type ContentElements, type StateProp } from '../../types'
import { after, before, dif, getComment, getParent, prepend, remove, setParent, statePropToWatchProp } from '../../utils'

export const FOR_VALUE = Symbol('FOR_VALUE') as unknown as string
export const FOR_INDEX = Symbol('FOR_INDEX') as unknown as string

const WATCHER_KEY = Symbol('WATCHER_KEY') as unknown as string

function getKey (key: any, value: any) {
  if (typeof key === 'function') {
    return key(value)
  } else if (key === undefined) {
    return value
  } else {
    return value[key]
  }
}

type GetType<O extends StateProp<Iterable<any>>> = O extends StateProp<Iterable<infer T>> ? T : never

export interface ForProps<O extends StateProp<Iterable<any>>> {
  of: O
  key?: keyof GetType<O> | ((item: GetType<O>) => any)
  children?: (value: O extends Iterable<GetType<O>> ? GetType<O> : State<GetType<O>>, index: O extends Iterable<GetType<O>> ? number : State<number>) => JSX.Element
}

export function For<O extends StateProp<Iterable<any>>> ({
  key,
  of: ofPropRaw,
  children,
}: ForProps<O>) {
  if (!children || !ofPropRaw) return EMPTY

  const ofProp = statePropToWatchProp(ofPropRaw)

  if (typeof ofProp !== 'function') return Array.from(ofProp).map<JSX.Element>(children as any)

  const handler = useHandler()
  const [childHandler, mainComment] = getComment(handler, 'For')
  let keysList: any[] = []
  const handlersMap = new Map<any, Handler>()

  onDestroy(() => {
    handlersMap.forEach(({ [WATCHER_KEY]: watcher }) => watcher.destroy())
  })

  new Watch(update => {
    const values = ofProp(update)

    if (!update) {
      let index = 0

      for (const value of values) {
        const valueKey = getKey(key, value)

        if (handlersMap.has(valueKey)) continue

        keysList.push(valueKey)

        const [deepHandler] = getComment(childHandler, valueKey, true)
        deepHandler[FOR_VALUE] = new State(value)
        deepHandler[FOR_INDEX] = new State(index++)
        handlersMap.set(valueKey, deepHandler)

        deepHandler[WATCHER_KEY] = new Watch(() => {
          innet(children(deepHandler[FOR_VALUE], deepHandler[FOR_INDEX]), deepHandler)
        }, true)
      }

      return
    }

    const oldKeysList = keysList
    const oldKeysSet = new Set(oldKeysList)
    keysList = []

    for (const value of values) {
      keysList.push(getKey(key, value))
    }

    const keepKeys = dif(oldKeysList, keysList)

    let i = 0
    for (const value of values) {
      const index = i++
      const valueKey = keysList[index]

      if (handlersMap.has(valueKey)) {
        const keep = keepKeys.includes(valueKey)
        const deepHandler = handlersMap.get(valueKey)

        unwatch(createEvent(() => {
          deepHandler[FOR_VALUE].value = value
          deepHandler[FOR_INDEX].value = index
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
        deepHandler[FOR_VALUE] = new State(value)
        deepHandler[FOR_INDEX] = new State(index)
        handlersMap.set(valueKey, deepHandler)

        if (index) {
          after(getParent(handlersMap.get(keysList[index - 1])), comment)
        } else if (oldKeysList.length) {
          before(getParent(handlersMap.get(oldKeysList[0])), comment)
        } else {
          prepend(mainComment, comment)
        }

        deepHandler[WATCHER_KEY] = new Watch(() => {
          innet(children(deepHandler[FOR_VALUE], deepHandler[FOR_INDEX]), deepHandler)
        }, true)
      }

      oldKeysSet.delete(valueKey)
    }

    oldKeysSet.forEach(valueKey => {
      const deepHandler = handlersMap.get(valueKey)
      handlersMap.delete(valueKey)
      remove(getParent(deepHandler) as ContentElements)
      deepHandler[WATCHER_KEY].destroy()
    })
  })

  return EMPTY
}
