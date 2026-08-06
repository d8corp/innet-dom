import { EMPTY } from '@innet/jsx'
import { type Handler, innet, useHandler } from 'innet'
import { createEvent, onDestroy, scope, State, unwatch, Watch } from 'watch-state'

import { forIndexContext, forValueContext } from './hoohs'

import { type ContentElements, type StateProp } from '../../types'
import {
  after,
  before,
  getComment,
  getParent,
  lcs,
  prepend,
  remove,
  setParent,
  statePropToWatchProp,
} from '../../utils'

/**
 * @deprecated Use `forValueContext`
 * */
export const FOR_VALUE = forValueContext.key as unknown as string

/**
 * @deprecated Use `forIndexContext`
 * */
export const FOR_INDEX = forIndexContext.key

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

  new Watch(() => {
    const values = ofProp()

    if (!scope.activeWatcher!.updated) {
      let index = 0

      for (const value of values) {
        const valueKey = getKey(key, value)

        if (handlersMap.has(valueKey)) continue

        keysList.push(valueKey)

        const [deepHandler] = getComment(childHandler, valueKey, true)
        const valueState = new State(value)
        const indexState = new State(index++)

        forValueContext.set(deepHandler, valueState)
        forIndexContext.set(deepHandler, indexState)
        handlersMap.set(valueKey, deepHandler)

        deepHandler[WATCHER_KEY] = new Watch(() => {
          innet(children(valueState as any, indexState as any), deepHandler, 0, true)
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

    const keepKeys = new Set(lcs(oldKeysList, keysList))

    let i = 0

    for (const value of values) {
      const index = i++
      const valueKey = keysList[index]

      if (handlersMap.has(valueKey)) {
        const keep = keepKeys.has(valueKey)
        const deepHandler = handlersMap.get(valueKey) as Handler

        unwatch(createEvent(() => {
          forValueContext.get(deepHandler)!.set(value)
          forIndexContext.get(deepHandler)!.set(index)
        }))

        if (!keep) {
          const comment = getParent(deepHandler) as ContentElements

          if (index) {
            after(getParent(handlersMap.get(keysList[index - 1]) as Handler), comment)
          } else if (oldKeysList.length) {
            before(getParent(handlersMap.get(oldKeysList[0]) as Handler), comment)
          } else {
            prepend(mainComment, comment)
          }
        }
      } else {
        const comment = document.createComment(valueKey)
        const deepHandler = Object.create(childHandler)
        setParent(deepHandler, comment)
        const valueState = new State(value)
        const indexState = new State(index)

        forValueContext.set(deepHandler, valueState)
        forIndexContext.set(deepHandler, indexState)
        handlersMap.set(valueKey, deepHandler)

        if (index) {
          after(getParent(handlersMap.get(keysList[index - 1]) as Handler), comment)
        } else if (oldKeysList.length) {
          before(getParent(handlersMap.get(oldKeysList[0]) as Handler), comment)
        } else {
          prepend(mainComment, comment)
        }

        deepHandler[WATCHER_KEY] = new Watch(() => {
          innet(children(valueState as any, indexState as any), deepHandler, 0, true)
        }, true)
      }

      oldKeysSet.delete(valueKey)
    }

    oldKeysSet.forEach(valueKey => {
      const deepHandler = handlersMap.get(valueKey) as Handler
      handlersMap.delete(valueKey)
      remove(getParent(deepHandler) as ContentElements)
      deepHandler[WATCHER_KEY].destroy()
    })
  })

  return EMPTY
}
