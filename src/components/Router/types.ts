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

export interface RoutingRoute {
  components: RouteComponent[]
  params: string[]
}

export interface Routing {
  index?: RoutingRoute
  strict?: Record<string, Routing>
  children?: Routing
  rest?: RoutingRoute
}
