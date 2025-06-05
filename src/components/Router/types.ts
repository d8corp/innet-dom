import { type ChildrenProps } from '../../types'

export type RouteComponent = (props: ChildrenProps) => JSX.Element
export type RouteLazyComponentResult = Promise<{ default: RouteComponent } | RouteComponent>
export type RouteLazyComponent = () => RouteLazyComponentResult

interface BaseNoLazyComponentRoute {
  component: RouteComponent
  lazy?: false
  fallback?: never
}

interface BaseLazyComponentRoute {
  component: RouteLazyComponent
  lazy: true
  fallback?: JSX.Element
}

export type BaseComponentRoute = BaseLazyComponentRoute | BaseNoLazyComponentRoute

interface BaseNoComponentRoute {
  component?: never
  lazy?: never
}

type BaseRoute = (BaseComponentRoute | BaseNoComponentRoute) & {
  path?: string
}

type IndexRoute = BaseRoute & {
  index: true
}

type NoIndexRoute = BaseRoute & {
  index?: false
  children?: Route[]
}

export type Route = IndexRoute | NoIndexRoute

export interface RoutingRoute {
  components: Array<RouteComponent | RouteLazyComponent>
  lazy: boolean[]
  fallback?: JSX.Element[]
  params: string[]
}

export interface Routing {
  index?: RoutingRoute
  strict?: Record<string, Routing>
  children?: Routing
  rest?: RoutingRoute
}
