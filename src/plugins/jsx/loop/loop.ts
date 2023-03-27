import { type JSXPluginElement } from '@innet/jsx'
import innet from 'innet'
import { createEvent, onDestroy, State, unwatch, Watch } from 'watch-state'

import { type StateProp } from '../../../types'
import { after, before, clear, dif, getComment, prepend, remove, setParent, statePropToWatchProp } from '../../../utils'

interface LoopMap<T> {
  watcher: Watch
  comment: Comment
  item: LoopItem<T>
}

export interface LoopProps<T = any> {
  of: StateProp<T[]>
  key?: keyof T | ((item: T) => any)
}
export type LoopCallback<T> = (item: LoopItem<T>) => any
export type LoopChildren<T> = [ LoopCallback<T>, ...any[] ]

export class LoopItem<T> {
  private readonly _value: State<T>
  private readonly _index: State<number>

  constructor (value: T, index: number) {
    this._index = new State(index)
    this._value = new State(value)
  }

  get value () {
    return this._value.value
  }

  set value (value) {
    this._value.value = value
  }

  get index () {
    return this._index.value
  }

  set index (index) {
    this._index.value = index
  }
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

export function loop <T> ({
  type,
  props: {
    key,
    of: ofState,
  },
  children: [
    callback,
  ],
}: JSXPluginElement<LoopProps<T>, LoopChildren<T>>, handler) {
  const ofProp = statePropToWatchProp(ofState)

  if (typeof ofProp === 'function') {
    const [childHandler, mainComment] = getComment(handler, type)

    let map = new Map<any, LoopMap<T>>()
    let keysList: any[] = []
    let isElse = false

    onDestroy(() => {
      map.forEach(({ watcher, comment }) => {
        watcher.destroy()
        remove(comment)
      })
    })

    new Watch(update => {
      const values = typeof ofProp === 'function' ? ofProp(update) : ofProp

      if (update) {
        const oldKeysList = keysList
        keysList = values.map(value => getKey(key, value))
        const keepKeys = dif(oldKeysList, keysList)

        const oldMap = map
        map = new Map()

        let index = 0

        for (; index < values.length; index++) {
          const value = values[index]

          if (isElse) {
            isElse = false
            clear(mainComment)
          }

          const valueKey = keysList[index]

          if (map.has(valueKey)) {
            continue
          }

          const keep = keepKeys?.includes(valueKey)
          const wasBefore = oldMap.has(valueKey)

          if (wasBefore) {
            const data = oldMap.get(valueKey)

            unwatch(createEvent(() => {
              data.item.value = value
              data.item.index = index
            }))
            map.set(valueKey, data)

            if (!keep) {
              if (index) {
                after(map.get(keysList[index - 1]).comment, data.comment)
              } else if (oldKeysList.length) {
                before(oldMap.get(oldKeysList[0]).comment, data.comment)
              } else {
                prepend(mainComment, data.comment)
              }
            }

            oldMap.delete(valueKey)
          } else {
            const item = new LoopItem(value, index)
            const comment = document.createComment(valueKey)
            const deepHandler = Object.create(childHandler)
            setParent(deepHandler, comment)

            if (index) {
              after(map.get(keysList[index - 1]).comment, comment)
            } else if (oldKeysList.length) {
              before(oldMap.get(oldKeysList[0]).comment, comment)
            } else {
              prepend(mainComment, comment)
            }

            const watcher = new Watch(update => {
              if (update) {
                clear(comment)
              }
              innet(callback(item), deepHandler)
            }, true)

            map.set(valueKey, { comment, item, watcher })
          }
        }

        oldMap.forEach(({ comment, watcher }) => {
          watcher.destroy()
          remove(comment)
        })
      } else {
        let index = 0

        for (; index < values.length; index++) {
          const value = values[index]
          const valueKey = getKey(key, value)

          if (map.has(valueKey)) continue

          keysList.push(valueKey)

          const [deepHandler, comment] = getComment(childHandler, valueKey, true)
          const item = new LoopItem(value, index)

          const watcher = new Watch(update => {
            if (update) {
              clear(comment)
            }
            innet(callback(item), deepHandler)
          }, true)

          map.set(valueKey, { comment, item, watcher })
        }
      }
    })

    return mainComment
  } else {
    const result = []

    for (const value of ofProp) {
      result.push(callback({ value, index: result.length } as LoopItem<T>))
    }

    return innet(result, handler)
  }
}
