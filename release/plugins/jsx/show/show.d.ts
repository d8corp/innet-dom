import { JSXPluginElement } from '@innet/jsx';
import { StateProp } from '../../../types';
export interface ShowProps {
    state: StateProp<any>;
}
export declare function show({ props: { state }, children }: JSXPluginElement<ShowProps>, handler: any): any;
