import { arraySync } from '@innet/utils';
import { context, ContextProps, domAsync, domFn, domNode, domText, loop, LoopProps, portal, PortalProps } from '../plugins';
export declare const arrayPlugins: (typeof arraySync)[];
export declare const JSXPlugins: {
    context: typeof context;
    portal: typeof portal;
    for: typeof loop;
};
export declare const objectPlugins: ((handler: any) => import("innet").PluginHandler)[];
export declare const fnPlugins: (typeof domFn)[];
export declare const stringPlugins: (typeof domText)[];
export declare const numberPlugins: (typeof domText)[];
export declare const nodePlugins: (typeof domNode)[];
export declare const promisePlugins: (typeof domAsync)[];
export declare const handler: import("innet").Handler;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            portal: PortalProps;
            for: LoopProps;
            context: ContextProps;
            [elemName: string]: any;
        }
    }
}
