import { type JSXElement } from '@innet/jsx';
import { arraySync } from '@innet/utils';
import { type Observable } from 'watch-state';
import { domAsync, domFn, domNode, domText } from '../plugins';
import { type HTMLProps } from '../types';
export declare const arrayPlugins: (typeof arraySync)[];
export declare const objectPlugins: (() => import("innet").HandlerPlugin)[];
export declare const fnPlugins: (typeof domFn)[];
export declare const stringPlugins: (typeof domText)[];
export declare const numberPlugins: (typeof domText)[];
export declare const nodePlugins: (typeof domNode)[];
export declare const promisePlugins: (typeof domAsync)[];
export declare const handler: import("innet").Handler;
declare global {
    namespace JSX {
        type Element = PromiseElement | NonPromiseElement;
        type NonPromiseElement = ArrayElement | WatchElement | JSXElement | Generator<Element, void, unknown> | Observable<Element> | boolean | null | number | string | symbol | undefined | void;
        interface ArrayElement extends Array<Element> {
        }
        type WatchElement = (update: boolean) => Element;
        type PromiseElement = Promise<NonPromiseElement>;
        interface ElementChildrenAttribute {
            children: {};
        }
        interface IntrinsicElements {
            a: HTMLProps<HTMLAnchorElement>;
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
