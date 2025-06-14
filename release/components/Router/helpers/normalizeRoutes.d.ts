import { type BaseComponentRoute, type Route } from '../types';
interface PathRoute {
    path: string;
    children: NormalizedRoute[];
    lazy?: never;
    fallback?: never;
    childrenFallback?: never;
    permissions?: never;
    component?: never;
    index?: never;
}
type IndexRoute = BaseComponentRoute & {
    index: true;
    path?: never;
    children?: never;
    childrenFallback?: never;
};
type NoIndexRoute = BaseComponentRoute & {
    index?: false;
    children?: NormalizedRoute[];
    childrenFallback?: JSX.Element;
    path?: never;
};
export type NormalizedRoute = PathRoute | IndexRoute | NoIndexRoute;
export declare function normalizeRoutes(routes: Route[]): NormalizedRoute[];
export {};
