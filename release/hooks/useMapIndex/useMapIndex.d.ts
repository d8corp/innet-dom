import { Context } from '@innet/jsx';
import { type ObservableProp } from '../../types';
declare const mapIndexUnknown: unique symbol;
export declare const mapIndexContext: Context<any, typeof mapIndexUnknown>;
export declare function useMapIndex(): ObservableProp<number>;
export {};
