import { Context, createContextHandler, type JSXPluginElement, useSlots } from '@innet/jsx'
import { locationPath, locationSearch } from '@watch-state/history-api'
import innet, { type Handler, runPlugins, useApp, useHandler } from 'innet'
import { Cache } from 'watch-state'

import { useMapValue } from '../../../hooks'
import { use } from '../../../utils'
import { parseSearch } from '../../../utils/parseSearch'
import { map } from '../map'

export interface RouterProps {
  search?: string | number
  ish?: boolean
}

export const routerContext = new Context(1)

export const parsedSearch = new Cache(() => parseSearch(locationSearch.value))

export const parsedPath = new Cache(() => locationPath.value.split('/').map(e => e || '/'), true)
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

  runPlugins({
    type: 'router-loop',
    props: { of: () => currentSlots.value },
    children: [{
      type () {
        return update => slots[use(useMapValue<any>(), update)]
      },
    }],
  }, handler, [map])
}

export function router () {
  const { props } = useApp<JSXPluginElement<RouterProps>>()
  const handler = useHandler()
  const slots = useSlots()
  const deep = props?.search || routerContext.get(handler)
  const search = props?.search
  const ish = props?.ish

  if (search && ish) {
    renderSearchIsh(String(search), slots, handler)
    return
  }

  const curRoute = search
    ? new Cache<string>(() => {
      const value = parsedSearch.value[search]
      return Array.isArray(value) ? String(value[0]) : String(value)
    })
    : ish ? getRoute(handler, deep) : getStrongRoute(handler, deep)

  const slot = new Cache(() => {
    const route = curRoute.value

    if (route && route in slots) {
      return slots[route]
    }
    return slots['']
  })

  innet(() => {
    const currentSlot = slot.value

    if (currentSlot !== slots['']) {
      return search
        ? currentSlot
        : {
            type: () => {
              innet(currentSlot, createContextHandler(useHandler(), routerContext, deep + 1))
            },
          }
    }

    return currentSlot
  }, handler)
}
