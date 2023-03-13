import { type ClassesArgument } from 'html-classes';
import { type HTMLProps } from '../../types';
export type Styles = Record<string, any>;
export interface Style<S = any> {
    class?: ClassesArgument<keyof S> | Record<keyof S, ClassesArgument<keyof S>>;
}
export type HTMLStyleProps<E extends HTMLElement = HTMLElement, S = any> = Omit<HTMLProps<E>, 'class'> & Style<S>;
export declare function getStyles<S extends Styles>(styles: S, props: any): S;
export declare function style<S>(styles: S, rest?: Record<string, any>): () => S;
