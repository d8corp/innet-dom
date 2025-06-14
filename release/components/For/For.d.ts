import { EMPTY } from '@innet/jsx';
import { State } from 'watch-state';
import { type StateProp } from '../../types';
export declare const FOR_VALUE: string;
export declare const FOR_INDEX: string;
type GetType<O extends StateProp<Iterable<any>>> = O extends StateProp<Iterable<infer T>> ? T : never;
export interface ForProps<O extends StateProp<Iterable<any>>> {
    of: O;
    key?: keyof GetType<O> | ((item: GetType<O>) => any);
    children?: (value: O extends Iterable<GetType<O>> ? GetType<O> : State<GetType<O>>, index: O extends Iterable<GetType<O>> ? number : State<number>) => JSX.Element;
}
export declare function For<O extends StateProp<Iterable<any>>>({ key, of: ofPropRaw, children, }: ForProps<O>): JSX.Element[] | typeof EMPTY;
export {};
