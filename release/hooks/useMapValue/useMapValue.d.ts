import { Context } from '@innet/jsx';
import { type StateProp } from '../../types';
declare const mapValueUnknown: unique symbol;
export declare const mapValueContext: Context<any, typeof mapValueUnknown>;
export declare function useMapValue<V>(): StateProp<V>;
export {};
