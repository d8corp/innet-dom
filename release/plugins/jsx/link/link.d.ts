import { type HTMLStyleProps } from '../../../hooks/useStyle';
export declare const defaultClass: {
    root: any;
    active: any;
};
export interface LinkProps extends HTMLStyleProps<HTMLAnchorElement, typeof defaultClass> {
    target?: '_blank' | '_parent' | '_self' | '_top';
    scroll?: 'after' | 'before' | 'none';
    scrollTo?: number | string;
    replace?: boolean;
    exact?: boolean;
}
export declare function link(): void;
