import { type BaseComponentRoute, type Route } from '../types'

interface PathRoute {
  path: string
  children: NormalizedRoute[]
  lazy?: never
  fallback?: never
  childrenFallback?: never
  permissions?: never
  component?: never
  index?: never
}

type IndexRoute = BaseComponentRoute & {
  index: true
  path?: never
  children?: never
  childrenFallback?: never
}

type NoIndexRoute = BaseComponentRoute & {
  index?: false
  children?: NormalizedRoute[]
  childrenFallback?: JSX.Element
  path?: never
}

export type NormalizedRoute = PathRoute | IndexRoute | NoIndexRoute

export function normalizeRoutes (routes: Route[]): NormalizedRoute[] {
  return routes.map((route): NormalizedRoute => {
    if (!route.path) return route as NormalizedRoute

    const splitPath = route.path.split('/').filter(Boolean)

    if (
      !route.component &&
      !route.index &&
      splitPath.length === 1
    ) return route as NormalizedRoute

    const { path, ...rest } = route
    let currentRoute: Route = rest

    for (let i = splitPath.length - 1; i > -1; i--) {
      currentRoute = { path: splitPath[i], children: [currentRoute] }
    }

    return currentRoute as NormalizedRoute
  })
}
