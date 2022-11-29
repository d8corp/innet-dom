import { ClassesArgument } from 'html-classes';
import { HTMLProps } from '../../types';
export interface Style<S = any> {
    class?: ClassesArgument<keyof S> | Record<keyof S, ClassesArgument<keyof S>>;
}
export type HTMLStyleProps<E extends HTMLElement = HTMLElement, S = any> = Omit<HTMLProps<E>, 'class'> & Style<S>;
export declare function getStyles<S>(styles: S, props: any): S;
export declare function style<S>(styles: S): () => S;
