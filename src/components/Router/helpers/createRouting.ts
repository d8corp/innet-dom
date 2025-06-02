import { type Route, type RouteComponent, type Routing } from '../types'
import { normalizeRoutes } from './normalizeRoutes'

export function createRouting (
  routes: Route[],
  routing: Routing = {},
  parentComponents: RouteComponent[] = [],
  parentParams: string[] = [],
  parentRest = false,
): Routing {
  const normalizedRoutes = normalizeRoutes(routes)

  for (let i = 0; i < normalizedRoutes.length; i++) {
    const route = normalizedRoutes[i]
    const pathKey = route.path
    const components = route.component ? [...parentComponents, route.component] : parentComponents

    if (pathKey) {
      if (pathKey.startsWith(':') && !pathKey.endsWith(']')) {
        const paramKey = pathKey.substring(1)
        const params = [...parentParams, paramKey]

        if (route.children) {
          if (!routing.children) {
            routing.children = {}
          }

          createRouting(route.children, routing.children, components, params, Boolean(routing.rest))
          continue
        }

        if (routing.rest) {
          throw Error(`Routing Error. Do not use a param route with rest route. Param: "${paramKey}".`)
        }

        routing.rest = { components, params }

        continue
      }

      if (!routing.strict) {
        routing.strict = {}
      }

      const [paramKey, unionPath] = pathKey.startsWith(':') ? pathKey.slice(1, -1).split('[') : [undefined, pathKey]
      const params = paramKey ? [...parentParams, paramKey] : [...parentParams, '']

      for (const key of unionPath.split('|')) {
        if (!routing.strict[key]) {
          routing.strict[key] = {}
        }

        createRouting(route.children, routing.strict[key], components, params)
      }

      continue
    }

    if (route.index) {
      if (routing.index) {
        throw Error('Routing Error. Do not use index routes twice.')
      }

      routing.index = {
        components,
        params: parentParams,
      }

      continue
    }

    if (route.children?.length) {
      createRouting(route.children, routing, components, parentParams)
      continue
    }

    if (routing.rest || routing.children?.rest || parentRest) {
      throw Error('Routing Error. Do not use the same routes.')
    }

    routing.rest = {
      components,
      params: parentParams,
    }
  }

  return routing
}
