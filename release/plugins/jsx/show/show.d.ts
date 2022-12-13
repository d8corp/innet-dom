import { JSXPluginElement } from '@innet/jsx';
import { Cache, State } from 'watch-state';
import { WatchProp } from '../../../types';
export interface ShowProps {
    state: WatchProp<any> | State | Cache;
}
export declare function show({ props: { state }, children }: JSXPluginElement<ShowProps>, handler: any): any;
