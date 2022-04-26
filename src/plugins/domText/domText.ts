import innet, { PluginHandler } from 'innet'

export function domText (): PluginHandler {
  return (text, next, handler) => innet(document.createTextNode(text), handler)
}
