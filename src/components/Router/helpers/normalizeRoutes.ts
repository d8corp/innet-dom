import { type ChildrenProps } from '../../../types'
import { type Route } from '../types'

export interface NormalizedPathRoute {
  path: string
  children: NormalizedRoute[]
  component?: never
  index?: never
}

export interface NormalizedIndexRoute {
  index: true
  component?: (props: ChildrenProps) => JSX.Element
  path?: never
  children?: never
}

export interface NormalizedNoIndexRoute {
  index?: false
  component?: (props: ChildrenProps) => JSX.Element
  children?: NormalizedRoute[]
  path?: never
}

export type NormalizedRoute = NormalizedPathRoute | NormalizedIndexRoute | NormalizedNoIndexRoute

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
