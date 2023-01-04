import { Handler } from 'innet';
import { Cache, State } from 'watch-state';
import { Ref } from './utils';
export type ContentElements = TargetElements | Text;
export type TargetElements = Element | Comment;
export type ParentElements = TargetElements | DocumentFragment;
export type UseComment = [Handler, Comment];
export type WatchProp<T> = T | ((update: boolean) => T);
export type StateProp<T> = WatchProp<T> | State<T> | Cache<T>;
export interface HTMLDefaultProps<E extends HTMLElement = HTMLElement> {
    class?: StateProp<string>;
    style?: Partial<Record<string, StateProp<string>>>;
    ref?: Ref<E>;
}
export interface HTMLDataProps {
    [key: `data-${string}`]: StateProp<string>;
}
export type HTMLProps<E extends HTMLElement = HTMLElement> = Omit<{
    [K in Extract<keyof E, `on${string}`>]?: E[K];
} & {
    [K in Exclude<keyof E, symbol> as E[K] extends Function ? never : `${'' | '_' | '$'}${K}`]?: StateProp<E[K] | undefined>;
}, keyof HTMLDefaultProps> & HTMLDefaultProps<E> & HTMLDataProps;
declare global {
    interface Comment {
        _children: ContentElements[];
        _parent?: Comment;
    }
    interface Element {
        _parent?: Comment;
    }
    interface Text {
        _parent?: Comment;
    }
}
