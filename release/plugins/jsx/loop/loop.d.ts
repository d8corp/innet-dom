import { type JSXPluginElement } from '@innet/jsx';
import { type StateProp } from '../../../types';
export interface LoopProps<T = any> {
    of: StateProp<T[]>;
    key?: keyof T | ((item: T) => any);
}
export type LoopCallback<T> = (item: LoopItem<T>) => any;
export type LoopChildren<T> = [LoopCallback<T>, ...any[]];
export declare class LoopItem<T> {
    private readonly _value;
    private readonly _index;
    constructor(value: T, index: number);
    get value(): T;
    set value(value: T);
    get index(): number;
    set index(index: number);
}
export declare function loop<T>({ type, props: { key, of: ofState, }, children: [callback,], }: JSXPluginElement<LoopProps<T>, LoopChildren<T>>, handler: any): any;
