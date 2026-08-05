import { type HandlerPlugin, innet, NEXT, useApp, useHandler } from 'innet'
import { Observable } from 'watch-state'

export function state (): HandlerPlugin {
  return () => {
    const state = useApp()

    if (!(state instanceof Observable)) return NEXT

    innet(() => state.value, useHandler(), 0, true)
  }
}
