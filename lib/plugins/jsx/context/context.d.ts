import { JSXPluginElement } from '@innet/jsx';
import { Handler } from 'innet';
export interface ContextProps<D = any> {
    for: Context<D>;
    set?: D;
}
export declare function useContext<D = any, Def = D>(context: Context<D, Def>): D | Def;
export declare class Context<D = any, Def = D> {
    readonly defaultValue?: Def;
    readonly key: string;
    constructor(defaultValue?: Def, name?: string);
    get(handler: Handler): D | Def;
}
export declare function createContextHandler<D>(handler: Handler, context: Context<D>, value: D): Handler;
export declare function context({ props, children }: JSXPluginElement<ContextProps>, handler: Handler): any;
