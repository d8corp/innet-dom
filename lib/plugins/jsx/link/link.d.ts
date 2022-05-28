import { JSXPluginElement } from '@innet/jsx';
import { Ref } from '../../../utils';
export interface LinkClasses {
    root: string;
    active: string;
}
export interface LinkProps {
    href?: string;
    class?: string;
    classes?: Partial<LinkClasses>;
    id?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    hidden?: boolean;
    autofocus?: boolean;
    type?: string;
    push?: boolean;
    exact?: boolean;
    rel?: string;
    ref?: Ref<HTMLAnchorElement>;
    scroll?: 'after' | 'before' | 'none';
    scrollTo?: number | string;
    replace?: boolean;
    onclick?: (e: MouseEvent) => any;
    [key: string]: any;
}
export declare function link({ type, props, children }: JSXPluginElement<LinkProps, void>, oldHandler: any): any;
