/// <reference types="qs" />
import { Context } from '@innet/jsx';
import { type Handler } from 'innet';
import { Cache } from 'watch-state';
export interface RouterProps {
    search?: string | number;
    ish?: boolean;
}
export declare const routerContext: Context<any, number>;
export declare const parsedSearch: Cache<import("qs").ParsedQs>;
export declare const parsedPath: Cache<string[]>;
export declare const pathDeep: Cache<number>;
export declare const routes: Cache<string>[];
export declare const routesIsh: Cache<string>[];
export declare function getStrongRoute(handler: Handler, deep?: any): Cache<string>;
export declare function useRoute(): Cache<string>;
export declare function getRoute(handler: Handler, deep?: any): Cache<string>;
export declare function router(): void;
