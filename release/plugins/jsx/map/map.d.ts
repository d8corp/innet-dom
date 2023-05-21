import { type StateProp } from '../../../types';
export interface MapProps<T = any> {
    of: StateProp<T[]>;
    key?: keyof T | ((item: T) => any);
}
export declare function map<T>(): void;
