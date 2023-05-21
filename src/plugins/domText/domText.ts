import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'

export function domText (): HandlerPlugin {
  return () => {
    innet(document.createTextNode(useApp<string>()), useHandler())
  }
}
