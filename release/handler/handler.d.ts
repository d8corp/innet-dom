import { ContextProps, JSXPlugin, SlotProps, SlotsProps } from '@innet/jsx';
import { arraySync } from '@innet/utils';
import { DelayProps, domAsync, domFn, domNode, domText, LinkProps, LoopProps, PortalProps, RouterProps } from '../plugins';
import { HTMLProps } from '../types';
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
            router: RouterProps;
            delay: DelayProps;
            a: LinkProps;
            div: HTMLProps<HTMLDivElement>;
            span: HTMLProps<HTMLSpanElement>;
            h1: HTMLProps<HTMLHeadingElement>;
            h2: HTMLProps<HTMLHeadingElement>;
            h3: HTMLProps<HTMLHeadingElement>;
            h4: HTMLProps<HTMLHeadingElement>;
            h5: HTMLProps<HTMLHeadingElement>;
            h6: HTMLProps<HTMLHeadingElement>;
            ul: HTMLProps<HTMLUListElement>;
            ol: HTMLProps<HTMLOListElement>;
            li: HTMLProps<HTMLLIElement>;
            p: HTMLProps<HTMLParagraphElement>;
            button: HTMLProps<HTMLButtonElement>;
            form: HTMLProps<HTMLFormElement>;
            select: HTMLProps<HTMLSelectElement>;
            textarea: HTMLProps<HTMLTextAreaElement>;
            input: HTMLProps<HTMLInputElement>;
            img: HTMLProps<HTMLImageElement>;
            table: HTMLProps<HTMLTableElement>;
            [elemName: string]: any;
        }
    }
}
