import { Handler } from 'innet';
export declare class Context<D = any, Def = D> {
    readonly defaultValue?: Def;
    readonly key: string;
    constructor(defaultValue?: Def, name?: string);
    get(handler: Handler): D | Def;
}
export interface ContextProps<D = any> {
    for: Context<D>;
    set?: D;
}
export declare function context({ props, children }: {
    props: any;
    children: any;
}, handler: any): any;
