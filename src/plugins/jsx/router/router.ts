import { JSXPluginElement, useHandler } from '@innet/jsx'
import History from '@watch-state/history-api'
import innet, { Handler } from 'innet'
import { Cache } from 'watch-state'

import { Context, createContextHandler } from '../context'
import { getSlots } from '../slot'

export interface RouterProps {
  search?: string | number
  ish?: boolean
}

export const history = new History()
export const routerContext = new Context(1)

export const parsedPath = new Cache(() => history.path.split('/').map(e => e || '/'), true)
export const pathDeep = new Cache(() => parsedPath.value.length, true)

export const routes: Cache<string>[] = []
export const routesIsh: Cache<string>[] = []

export function getStrongRoute (handler: Handler, deep = routerContext.get(handler)): Cache<string> {
  const routeIndex = deep - 1
  if (!routes[routeIndex]) {
    routes[routeIndex] = new Cache(() => {
      if (pathDeep.value > deep + 1) {
        return ''
      }
      return parsedPath.value[deep] || '/'
    }, true)
  }

  return routes[routeIndex]
}

export function useRoute (): Cache<string> {
  return getRoute(useHandler())
}

export function getRoute (handler: Handler, deep = routerContext.get(handler)): Cache<string> {
  const routeIndex = deep - 1
  if (!routesIsh[routeIndex]) {
    routesIsh[routeIndex] = new Cache(() => parsedPath.value[deep] || '/', true)
  }

  return routesIsh[routeIndex]
}

export function router ({ props, children }: JSXPluginElement<RouterProps>, handler) {
  const slots = getSlots(handler, children)
  const deep = props?.search || routerContext.get(handler)
  const search = props && props.search
  const ish = props && props.ish

  return innet(() => {
    const route = search ? history.search(String(search)) : ish ? getRoute(handler, deep).value : getStrongRoute(handler, deep).value

    if (route && route in slots) {
      return search ? slots[route] : {
        type: () => {
          innet(slots[route], createContextHandler(useHandler(), routerContext, deep + 1))
        },
      }
    }

    return slots['']
  }, handler)
}
