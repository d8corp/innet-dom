import { Context, EMPTY } from '@innet/jsx'
import { innet, useHandler } from 'innet'
import Timer from 'sync-timer'
import { onDestroy, State, Watch } from 'watch-state'

import { useContextWatcher, watcherContext } from '../../hooks'
import { getComment, type Ref } from '../../utils'
import { REMOVE_DELAY } from '../../utils/dom/constants'

export const delayContext = new Context<undefined | State<boolean>>()

export function useHidden (): undefined | State<boolean> {
  return delayContext.get(useHandler())
}

export interface DelayProps {
  show?: number
  hide?: number
  ref?: Ref<State<boolean>>
  children?: JSX.Element
}

export function Delay ({ show = 0, hide = 0, ref, children }: DelayProps) {
  const handler = useHandler()

  const [childHandler, comment] = getComment(handler, 'Delay', true)

  const run = () => {
    innet(children, childHandler, 0, true)
  }

  if (hide > 0) {
    const hideState = childHandler[delayContext.key] = new State(false)
    // @ts-expect-error TODO: fix types
    comment[REMOVE_DELAY] = hide

    if (ref) {
      ref.value = hideState
    }

    useContextWatcher(() => {
      onDestroy(() => {
        hideState.value = true
        new Timer(() => { watcher.destroy() }, hide)
      })
    })

    const watcher = new Watch(() => {}, true)
    watcherContext.set(childHandler, watcher)

    if (show > 0) {
      new Timer(() => {
        if (!hideState.raw) {
          run()
        }
      }, show)
    } else {
      run()
    }

    return
  }

  if (show > 0) {
    let destroyed = false

    const activeWatcher = useContextWatcher(() => {
      onDestroy(() => {
        destroyed = true
      })
    })

    watcherContext.set(childHandler, activeWatcher)

    new Timer(() => {
      if (!destroyed) {
        run()
      }
    }, show)

    return
  }

  run()

  return EMPTY
}
