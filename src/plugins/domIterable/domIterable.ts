import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'

export const domIterable = (): HandlerPlugin => () => {
  const apps = useApp<Iterable<any>>()
  const handler = useHandler()
  let update = false

  for (const app of apps) {
    if (update) break

    innet(app, handler)
    update = true
  }
}
