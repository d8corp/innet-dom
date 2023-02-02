import innet, { type PluginHandler } from 'innet'
import { Cache, State } from 'watch-state'

export function state (): PluginHandler {
  return (state, next, handler) => {
    if (state instanceof State || state instanceof Cache) {
      return innet(() => state.value, handler)
    }

    return next()
  }
}
