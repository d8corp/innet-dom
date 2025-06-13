import { type Component } from '../../../types'
import { type LazyFn } from '../../../utils'
import { type Route, type Routing } from '../types'
import { normalizeRoutes } from './normalizeRoutes'

export function createRouting (
  routes: Route[],
  routing: Routing = {},
  parentComponents: Array<Component | LazyFn> = [],
  parentParams: string[] = [],
  parentFallbacks: JSX.Element[] = [],
  parentPermissions: string[] = [],
  parentFallback?: JSX.Element,
): Routing {
  const normalizedRoutes = normalizeRoutes(routes)

  for (let i = 0; i < normalizedRoutes.length; i++) {
    const route = normalizedRoutes[i]
    const optional = route.path?.endsWith('?')
    const pathKey = optional ? route.path?.slice(0, -1) : route.path
    const components = route.component
      ? [...parentComponents, route.component]
      : parentComponents
    const fallback = route.component ? [...parentFallbacks, route.fallback ?? parentFallback] : parentFallbacks
    const permissions = route.permissions ? [...parentPermissions, ...route.permissions] : parentPermissions

    if (pathKey) {
      if (pathKey.startsWith(':') && !pathKey.endsWith(']')) {
        const paramKey = pathKey.substring(1)
        const params = [...parentParams, paramKey]

        if (!routing.children) {
          routing.children = {}
        }

        createRouting(
          route.children as Route[],
          routing.children,
          components,
          params,
          fallback,
          permissions,
          route.childrenFallback ?? parentFallback,
        )
      } else {
        if (!routing.strict) {
          routing.strict = {}
        }

        const [paramKey, unionPath] = pathKey.startsWith(':') ? pathKey.slice(1, -1).split('[') : [undefined, pathKey]
        const params = paramKey ? [...parentParams, paramKey] : [...parentParams, '']

        for (const key of unionPath.split('|')) {
          if (!routing.strict[key]) {
            routing.strict[key] = {}
          }

          createRouting(
            route.children as Route[],
            routing.strict[key],
            components,
            params,
            fallback,
            permissions,
            route.childrenFallback ?? parentFallback,
          )
        }
      }

      if (!optional) continue
    }

    if (route.index) {
      if (permissions.length) {
        if (!routing.indexList) {
          routing.indexList = []
        }

        routing.indexList.push({
          components,
          permissions: new Set(permissions),
          fallback,
          params: parentParams,
        })

        continue
      }

      if (routing.index) {
        throw Error('Routing Error. Do not use index routes twice.')
      }

      routing.index = {
        components,
        fallback,
        params: parentParams,
      }

      continue
    }

    if (route.children?.length) {
      createRouting(
        route.children,
        routing,
        components,
        parentParams,
        fallback,
        permissions,
        route.childrenFallback ?? parentFallback,
      )
      continue
    }

    if (permissions.length) {
      if (!routing.restList) {
        routing.restList = []
      }

      routing.restList.push({
        components,
        permissions: new Set(permissions),
        fallback,
        params: parentParams,
      })

      continue
    }

    if (routing.rest) {
      throw Error('Routing Error. Do not use the same routes.')
    }

    routing.rest = {
      components,
      fallback,
      params: parentParams,
    }
  }

  return routing
}
