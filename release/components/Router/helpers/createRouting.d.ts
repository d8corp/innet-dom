import { type Component } from '../../../types';
import { type LazyFn } from '../../../utils';
import { type Route, type Routing } from '../types';
export declare function createRouting(routes: Route[], routing?: Routing, parentComponents?: Array<Component | LazyFn>, parentParams?: string[], parentFallbacks?: JSX.Element[], parentPermissions?: string[], parentFallback?: JSX.Element): Routing;
