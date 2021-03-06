import { JSXPluginElement } from '@innet/jsx';
import History from '@watch-state/history-api';
import { Handler } from 'innet';
import { Cache } from 'watch-state';
import { Context } from '../context';
export interface RouterProps {
    search?: string | number;
    ish?: boolean;
}
export declare const history: History;
export declare const routerContext: Context<any, number>;
export declare const parsedPath: Cache<any>;
export declare const pathDeep: Cache<any>;
export declare const routes: Cache<string>[];
export declare const routesIsh: Cache<string>[];
export declare function getStrongRoute(handler: Handler, deep?: any): Cache<string>;
export declare function useRoute(): Cache<string>;
export declare function getRoute(handler: Handler, deep?: any): Cache<string>;
export declare function router({ props, children }: JSXPluginElement<RouterProps>, handler: any): any;
