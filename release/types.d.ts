import { Handler } from 'innet';
import { Ref } from './utils';
export type ContentElements = TargetElements | Text;
export type TargetElements = Element | Comment;
export type UseComment = [Handler, Comment];
export type WatchProp<T> = T | ((update: boolean) => T);
export type HTMLProps<E extends HTMLElement = HTMLElement> = {
    [K in Extract<keyof E, `on${string}`>]?: E[K];
} & {
    [K in Exclude<keyof E, symbol> as E[K] extends Function ? never : `${'' | '_' | '$'}${K}`]?: WatchProp<E[K]>;
} & {
    style?: WatchProp<string>;
    ref?: Ref<E>;
};
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
