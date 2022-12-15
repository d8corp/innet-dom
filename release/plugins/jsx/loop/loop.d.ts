import { JSXPluginElement } from '@innet/jsx';
import { StateProp } from '../../../types';
export interface LoopProps<T = any> {
    of: StateProp<T[]>;
    size?: StateProp<number>;
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
export declare function loop<T>({ type, props: { size: sizeState, key, of: ofState, }, children: [callback, ...elseProp], }: JSXPluginElement<LoopProps<T>, LoopChildren<T>>, handler: any): any;
