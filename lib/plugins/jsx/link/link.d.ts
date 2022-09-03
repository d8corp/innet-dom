import { JSXPluginElement } from '@innet/jsx';
import { Style } from '../../../hooks/useStyle';
import { HTMLProps } from '../../../types';
import { Ref } from '../../../utils';
export declare const defaultClass: {
    root: any;
    active: any;
};
declare type OmitProps = 'scroll' | 'scrollTo';
export interface LinkProps extends Style<typeof defaultClass>, Omit<HTMLProps<HTMLLinkElement>, OmitProps> {
    target?: '_blank' | '_parent' | '_self' | '_top';
    ref?: Ref<HTMLAnchorElement>;
    scroll?: 'after' | 'before' | 'none';
    scrollTo?: number | string;
    replace?: boolean;
    exact?: boolean;
    onclick?: (e: MouseEvent) => void;
}
export declare function link({ type, props, children }: JSXPluginElement<LinkProps, void>, oldHandler: any): any;
export {};
