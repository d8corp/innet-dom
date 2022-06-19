import { JSXPluginElement, useHandler } from '@innet/jsx'
import innet, { Handler } from 'innet'
import { onDestroy, State, Watch } from 'watch-state'

import { useComment } from '../../../utils'
import { REMOVE_DELAY } from '../../../utils/dom/constants'
import { Context } from '../context'

export interface DelayProps {
  show?: number
  hide?: number
}

export const delayContext = new Context<undefined | State<boolean>>()

export function useHidden (): undefined | State<boolean> {
  return delayContext.get(useHandler())
}

export function delay ({ props, children }: JSXPluginElement<DelayProps>, handler: Handler) {
  let run = () => innet(children, handler)

  if (props) {
    const { show, hide } = props

    const [childHandler, comment] = useComment(handler, 'delay', true)
    handler = childHandler

    if (hide > 0) {
      const hideState = childHandler[delayContext.key] = new State(false)
      comment[REMOVE_DELAY] = hide

      run = () => {
        let result
        const watcher = new Watch(() => {
          result = innet(children, handler)
        }, true)

        onDestroy(() => {
          hideState.value = true
          setTimeout(() => watcher.destroy(), hide)
        })

        return result
      }
    }

    if (show > 0) {
      return setTimeout(() => run(), show)
    }
  }

  return run()
}
