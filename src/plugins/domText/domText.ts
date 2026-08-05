import { type HandlerPlugin, innet, useApp, useHandler } from 'innet'

export function domText (): HandlerPlugin {
  return () => {
    innet(document.createTextNode(useApp<string>()), useHandler(), 0, true)
  }
}
