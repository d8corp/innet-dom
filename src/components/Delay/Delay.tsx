import { Context, EMPTY } from '@innet/jsx'
import innet, { useHandler } from 'innet'
import Timer from 'sync-timer'
import { onDestroy, scope, State, Watch } from 'watch-state'

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

export function Delay ({ show, hide, ref, children }: DelayProps) {
  let handler = useHandler()

  const run = () => { innet(children, handler) }

  const [childHandler, comment] = getComment(handler, 'Delay', true)
  handler = childHandler

  if (hide > 0) {
    const hideState = childHandler[delayContext.key] = new State(false)
    comment[REMOVE_DELAY] = hide

    if (ref) {
      ref.value = hideState
    }

    const watcher = new Watch(() => {
      if (show > 0) {
        setTimeout(() => {
          if (!hideState.value) {
            scope.activeWatcher = watcher
            run()
            scope.activeWatcher = undefined
          }
        }, show)
      } else {
        run()
      }
    }, true)

    onDestroy(() => {
      hideState.value = true
      new Timer(() => { watcher.destroy() }, hide)
    })

    return
  }

  if (show > 0) {
    let destroyed = false
    const { activeWatcher } = scope
    onDestroy(() => {
      destroyed = true
    })
    setTimeout(() => {
      if (!destroyed) {
        scope.activeWatcher = activeWatcher
        run()
        scope.activeWatcher = undefined
      }
    }, show)
    return
  }

  run()

  return EMPTY
}
