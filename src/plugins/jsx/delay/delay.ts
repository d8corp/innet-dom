import { Context, type JSXPluginElement } from '@innet/jsx'
import innet, { useApp, useHandler } from 'innet'
import Timer from 'sync-timer'
import { onDestroy, scope, State, Watch } from 'watch-state'

import { getComment, type Ref } from '../../../utils'
import { REMOVE_DELAY } from '../../../utils/dom/constants'

export interface DelayProps {
  show?: number
  hide?: number
  ref?: Ref<State<boolean>>
}

export const delayContext = new Context<undefined | State<boolean>>()

export function useHidden (): undefined | State<boolean> {
  return delayContext.get(useHandler())
}

export function delay () {
  const { props, children } = useApp<JSXPluginElement<DelayProps>>()
  let handler = useHandler()

  const run = () => {
    innet(children, handler)
  }

  if (props) {
    const { show, hide, ref } = props

    const [childHandler, comment] = getComment(handler, 'delay', true)
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
  }

  run()
}
