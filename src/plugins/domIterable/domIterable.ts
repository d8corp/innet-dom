import innet, { type PluginHandler } from 'innet'

export const domIterable = (): PluginHandler => (apps, next, handler) => {
  let update = false
  let result

  for (const app of apps) {
    if (update) break

    result = innet(app, handler)
    update = true
  }

  return result
}
