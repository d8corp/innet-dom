import { type Component } from '../../types';
import { type LazyFn } from '../../utils';
interface BaseNoLazyComponentRoute {
    component: Component;
    permissions?: string[];
    fallback?: never;
}
interface BaseLazyComponentRoute {
    component: LazyFn;
    permissions?: string[];
    fallback?: JSX.Element;
}
export type BaseComponentRoute = BaseLazyComponentRoute | BaseNoLazyComponentRoute;
export interface BaseNoComponentRoute {
    component?: never;
    permissions?: string[];
    fallback?: never;
}
type BaseRoute = (BaseComponentRoute | BaseNoComponentRoute) & {
    path?: string;
};
type IndexRoute = BaseRoute & {
    index: true;
    children?: never;
};
type NoIndexRoute = BaseRoute & {
    index?: false;
    children?: Route[];
    childrenFallback?: JSX.Element;
};
export type Route = IndexRoute | NoIndexRoute;
export interface RoutingRoute {
    components: Array<Component | LazyFn>;
    fallback: JSX.Element[];
    params: string[];
}
export interface PermissionsRoutingRoute extends RoutingRoute {
    permissions: Set<string>;
}
export interface Routing {
    index?: RoutingRoute;
    strict?: Record<string, Routing>;
    children?: Routing;
    rest?: RoutingRoute;
    indexList?: PermissionsRoutingRoute[];
    restList?: PermissionsRoutingRoute[];
}
export {};
