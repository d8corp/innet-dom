import { ContextProps, JSXPlugin, SlotProps, SlotsProps } from '@innet/jsx';
import { arraySync } from '@innet/utils';
import { DelayProps, domAsync, domFn, domNode, domText, LinkProps, LoopProps, PortalProps, RouterProps } from '../plugins';
export declare const arrayPlugins: (typeof arraySync)[];
export declare const JSXPlugins: Record<string, JSXPlugin>;
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
            slots: SlotsProps;
            slot: SlotProps;
            a: LinkProps;
            router: RouterProps;
            delay: DelayProps;
            [elemName: string]: any;
        }
    }
}
