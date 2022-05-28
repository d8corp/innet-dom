import { JSXPluginElement } from '@innet/jsx';
interface WatchTarget<R = any> {
    (update?: boolean): R;
}
declare type OfPropStatic<T = any> = T[] | Set<T>;
declare type OfProp<T = any> = OfPropStatic<T> | WatchTarget<OfPropStatic<T>>;
export interface LoopProps<T = any> {
    of: OfProp<T>;
    size?: number | WatchTarget<number>;
    key?: keyof T | ((item: T) => any);
}
export declare type LoopCallback<T> = (item: LoopItem<T>) => any;
export declare type LoopChildren<T> = [LoopCallback<T>, ...any[]];
export declare class LoopItem<T> {
    private _value;
    private _index;
    constructor(value: T, index: number);
    get value(): T;
    set value(value: T);
    get index(): number;
    set index(index: number);
}
export declare function loop<T>({ props: { size: sizeProp, key, of: ofProp, }, children: [callback, ...elseProp], }: JSXPluginElement<LoopProps<T>, LoopChildren<T>>, handler: any): any;
export {};
