import { LAZY } from '../../constants';
import type { Component } from '../../types';
export type LazyResultData<C extends Component = Component> = {
    default: C;
} | C;
export type LazyResult<C extends Component = Component> = Promise<LazyResultData<C>>;
export type LazyParam<C extends Component = Component> = () => Promise<LazyResultData<C>>;
export interface LazyFn<C extends Component = Component> extends LazyParam<C> {
    [LAZY]: LazyParam<C>;
}
export declare function lazy<C extends Component>(fn: LazyParam<C>): LazyFn<C>;
