import { JSXPluginElement, useHandler } from '@innet/jsx'
import innet, { Handler } from 'innet'
import { onDestroy, State, Watch } from 'watch-state'

import { Ref, useComment } from '../../../utils'
import { REMOVE_DELAY } from '../../../utils/dom/constants'
import { Context } from '../context'

export interface DelayProps {
  show?: number
  hide?: number
  ref?: Ref<State<boolean>>
}

export const delayContext = new Context<undefined | State<boolean>>()

export function useHidden (): undefined | State<boolean> {
  return delayContext.get(useHandler())
}

export function delay ({ props, children }: JSXPluginElement<DelayProps>, handler: Handler) {
  const run = () => innet(children, handler)

  if (props) {
    const { show, hide, ref } = props

    const [childHandler, comment] = useComment(handler, 'delay', true)
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
              run()
            }
          }, show)
        } else {
          run()
        }
      }, true)

      onDestroy(() => {
        hideState.value = true
        setTimeout(() => watcher.destroy(), hide)
      })

      return
    }

    if (show > 0) {
      let destroyed = false
      onDestroy(() => {
        destroyed = true
      })
      return setTimeout(() => {
        if (!destroyed) {
          run()
        }
      }, show)
    }
  }

  return run()
}
