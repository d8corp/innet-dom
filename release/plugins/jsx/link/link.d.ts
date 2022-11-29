import { JSXPluginElement } from '@innet/jsx';
import { Style } from '../../../hooks/useStyle';
import { HTMLProps } from '../../../types';
export declare const defaultClass: {
    root: any;
    active: any;
};
export interface LinkProps extends Style<typeof defaultClass>, HTMLProps<HTMLAnchorElement> {
    target?: '_blank' | '_parent' | '_self' | '_top';
    scroll?: 'after' | 'before' | 'none';
    scrollTo?: number | string;
    replace?: boolean;
    exact?: boolean;
}
export declare function link({ type, props, children }: JSXPluginElement<LinkProps, void>, oldHandler: any): any;
