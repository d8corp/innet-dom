import { type ChildrenProps } from '../../types'

export interface BaseRoute {
  path?: string
  component?: (props: ChildrenProps) => JSX.Element
}

export interface IndexRoute extends BaseRoute {
  index: true
}

export interface NoIndexRoute extends BaseRoute {
  index?: false
  children?: Route[]
}

export type Route = IndexRoute | NoIndexRoute

export type RouteComponent = (props: ChildrenProps) => JSX.Element

export interface RoutingChildrenRoute {
  children: Routing
  components?: never
  pathKeys?: never
}

export interface RoutingComponentRoute {
  components: RouteComponent[]
  pathKeys: string[]
  children?: never
}

export type RoutingRoute = RoutingChildrenRoute | RoutingComponentRoute

export interface Routing {
  index?: RoutingRoute
  strict?: Record<string, Routing>
  rest?: RoutingRoute
}
