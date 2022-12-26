import { StateProp } from '../../types';
export type InjectCallback<V, R> = (value: V) => R;
export declare function inject<V, R>(value: StateProp<V>, callback: InjectCallback<V, R>): StateProp<R>;
