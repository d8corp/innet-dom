import { Context, createContextHandler, getSlots, JSXPluginElement, useHandler } from '@innet/jsx'
import History from '@watch-state/history-api'
import innet, { Handler } from 'innet'
import qs from 'qs'
import { Cache } from 'watch-state'

import { loop } from '../loop'

export interface RouterProps {
  search?: string | number
  ish?: boolean
}

export const history = new History()
export const routerContext = new Context(1)

export const parsedSearch = new Cache(() => qs.parse(history.search))

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

function renderSearchIsh (key: string, slots: Record<string, any>, handler: Handler) {
  const currentSlots = new Cache(() => {
    const result = parsedSearch.value[key]

    if (!result) return []
    if (Array.isArray(result)) return result

    return [result]
  })

  return loop({
    type: 'router-loop',
    props: { of: () => currentSlots.value },
    children: [({ value }) => slots[value as string]],
  }, handler)
}

export function router ({ props, children }: JSXPluginElement<RouterProps>, handler) {
  const slots = getSlots(handler, children)
  const deep = props?.search || routerContext.get(handler)
  const search = props && props.search
  const ish = props && props.ish

  if (search && ish) {
    return renderSearchIsh(String(search), slots, handler)
  }

  const slot = new Cache(() => {
    const route = search ? history.getSearch(String(search)) : ish ? getRoute(handler, deep).value : getStrongRoute(handler, deep).value
    if (route && route in slots) {
      return slots[route]
    }
    return slots['']
  })

  return innet(() => {
    const currentSlot = slot.value

    if (currentSlot !== slots['']) {
      return search ? currentSlot : {
        type: () => {
          innet(currentSlot, createContextHandler(useHandler(), routerContext, deep + 1))
        },
      }
    }

    return currentSlot
  }, handler)
}
