import { type HandlerPlugin, innet, NEXT, useApp, useHandler } from 'innet'

export function domArray (): HandlerPlugin {
  return () => {
    const app = useApp()

    if (!Array.isArray(app)) return NEXT

    const handler = useHandler()

    for (let i = app.length - 1; i > -1; i--) {
      innet(app[i], handler, 0, true)
    }
  }
}
