import { JSXPluginElement } from '@innet/jsx'
import innet from 'innet'
import { onDestroy, State, Watch } from 'watch-state'

import { after, before, clear, dif, getComment, prepend, remove, setParent } from '../../../utils'

interface LoopMap<T> {
  watcher: Watch
  comment: Comment
  item: LoopItem<T>
}

interface WatchTarget <R = any> {
  (update?: boolean): R
}

type OfPropStatic<T = any> = T[]
type OfProp<T = any> = OfPropStatic<T> | WatchTarget<OfPropStatic<T>>

export interface LoopProps<T = any> {
  of: OfProp<T>
  size?: number | WatchTarget<number>
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
    size: sizeProp = Infinity,
    key,
    of: ofProp,
  },
  children: [
    callback,
    ...elseProp
  ],
}: JSXPluginElement<LoopProps<T>, LoopChildren<T>>, handler) {
  if (typeof ofProp === 'function' || typeof sizeProp === 'function') {
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
      const size = typeof sizeProp === 'function' ? sizeProp(update) : sizeProp

      if (update) {
        const oldKeysList = keysList
        keysList = values.map(value => getKey(key, value))
        const keepKeys = dif(oldKeysList, keysList)

        const oldMap = map
        map = new Map()

        let index = 0

        for (; index < values.length; index++) {
          const value = values[index]

          if (size <= index) {
            break
          }

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

            data.item.value = value
            data.item.index = index
            map.set(valueKey, data)

            if (!keep && wasBefore) {
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

        if (!index && elseProp.length && !isElse) {
          isElse = true
          innet(elseProp, childHandler)
        }
      } else {
        let index = 0

        for (; index < values.length; index++) {
          if (size <= index) break

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

        if (!index && elseProp.length && !isElse) {
          isElse = true
          innet(elseProp, childHandler)
        }
      }
      // @ts-expect-error
    }).d8 = true

    return mainComment
  } else {
    const result = []
    let index = 0

    for (const value of ofProp) {
      if (sizeProp <= index) {
        break
      }

      result.push(callback({ value, index } as LoopItem<T>))

      index++
    }

    if (!index) {
      if (elseProp.length) {
        return innet(elseProp, handler)
      }
    } else {
      return innet(result, handler)
    }
  }
}
