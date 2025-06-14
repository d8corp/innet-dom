import { type Routing, type RoutingRoute } from '../types';
export declare function findRoute(routing: Routing, path: string[], params: Record<string, string>, permissions: Set<string>, index?: number): RoutingRoute | undefined;
