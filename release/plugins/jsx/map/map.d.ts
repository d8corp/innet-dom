import { type JSXPluginElement } from '@innet/jsx';
import { type StateProp } from '../../../types';
export interface MapProps<T = any> {
    of: StateProp<T[]>;
    key?: keyof T | ((item: T) => any);
}
export declare function map<T>({ type, props: { key, of: ofState, }, children, }: JSXPluginElement<MapProps<T>>, handler: any): any[] | Comment;
