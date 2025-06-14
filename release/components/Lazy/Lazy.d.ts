import { type Observable, type Watcher } from 'watch-state';
import { type Component, type StateProp } from '../../types';
import { type LazyResult } from '../../utils';
export interface LazyProps<C extends Component = Component> {
    component: Watcher<LazyResult<C> | C> | Observable<LazyResult<C> | C>;
    fallback?: JSX.Element;
    show?: StateProp<boolean>;
    render?: (Component: C) => JSX.Element;
    loadedComponents?: Map<LazyResult, Component>;
}
export declare function Lazy<C extends Component = Component>({ component, fallback, show, render, loadedComponents, }: LazyProps<C>): (() => JSX.Element) | undefined;
