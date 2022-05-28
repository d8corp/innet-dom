import { JSXPluginElement } from '@innet/jsx'
import innet from 'innet'
import { globalEvent, onDestroy, State, Watch } from 'watch-state'

import { after, clear, prepend, remove, setParent, useComment } from '../../../utils'

interface LoopMap<T> {
  watcher: Watch
  comment: Comment
  item: LoopItem<T>
}

interface WatchTarget <R = any> {
  (update?: boolean): R;
}

type OfPropStatic<T = any> = T[] | Set<T>
type OfProp<T = any> = OfPropStatic<T> | WatchTarget<OfPropStatic<T>>

export interface LoopProps<T = any> {
  of: OfProp<T>
  size?: number | WatchTarget<number>
  key?: keyof T | ((item: T) => any)
}
export type LoopCallback<T> = (item: LoopItem<T>) => any
export type LoopChildren<T> = [ LoopCallback<T>, ...any[] ]

export class LoopItem<T> {
  private _value: State<T>
  private _index: State<number>

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
    const [childHandler, mainComment] = useComment(handler, 'for')

    let map = new Map<any, LoopMap<T>>()
    let valuesList: any[] = []
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
        const oldValuesList = valuesList
        const oldMap = map
        map = new Map()
        valuesList = []
        let i = 0
        for (const value of values) {
          if (size <= i) {
            break
          }

          if (isElse) {
            isElse = false
            clear(mainComment)
          }

          const valueKey = getKey(key, value)

          if (map.has(valueKey)) {
            continue
          }

          if (valueKey === oldValuesList[i]) {
            const data = oldMap.get(valueKey)

            globalEvent.start()
            data.item.value = value
            map.set(valueKey, data)
            oldMap.delete(valueKey)
            globalEvent.end()
          } else if (oldMap.has(value)) {
            const data = oldMap.get(value)

            oldMap.delete(valueKey)
            data.item.index = i
            map.set(valueKey, data)
            if (i) {
              after(map.get(valuesList[i - 1]).comment, data.comment)
            } else {
              prepend(mainComment, data.comment)
            }
          } else {
            const item = new LoopItem(value, i)
            const comment = document.createComment(valueKey)
            const deepHandler = Object.create(childHandler)
            setParent(deepHandler, comment)

            if (i) {
              after(map.get(valuesList[i - 1]).comment, comment)
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

          valuesList.push(valueKey)
          i++
        }
        oldMap.forEach(({ comment, watcher }) => {
          watcher.destroy()
          remove(comment)
        })
        if (!i && elseProp.length && !isElse) {
          isElse = true
          innet(elseProp, childHandler)
        }
      } else {
        let i = 0

        for (const value of values) {
          if (size <= i) {
            break
          }

          const valueKey = getKey(key, value)

          if (map.has(valueKey)) {
            continue
          }

          const [deepHandler, comment] = useComment(childHandler, valueKey, true)
          const item = new LoopItem(value, i++)

          valuesList.push(valueKey)

          const watcher = new Watch(update => {
            if (update) {
              clear(comment)
            }
            innet(callback(item), deepHandler)
          }, true)

          map.set(valueKey, { comment, item, watcher })
        }

        if (!i && elseProp.length) {
          isElse = true
          innet(elseProp, childHandler)
        }
      }
    })

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
