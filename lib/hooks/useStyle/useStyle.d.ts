import { ClassesArgument } from 'html-classes';
export interface Style<S = any> {
    class?: ClassesArgument<keyof S> | Record<keyof S, ClassesArgument<keyof S>>;
}
export declare function getStyles<S>(styles: S, props: any): S;
export declare function style<S>(styles: S): () => S;
