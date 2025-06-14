import { type HTMLStyleProps } from '../../hooks';
export declare const defaultLinkClass: {
    root: undefined;
    active: undefined;
};
export interface LinkProps extends HTMLStyleProps<HTMLAnchorElement, typeof defaultLinkClass> {
    target?: '_blank' | '_parent' | '_self' | '_top';
    scroll?: 'after' | 'before' | 'none';
    scrollTo?: number | string;
    replace?: boolean;
    exact?: boolean;
    children?: JSX.Element;
}
export declare function Link(props: LinkProps): JSX.Element;
