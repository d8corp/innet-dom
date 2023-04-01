import { type JSXPluginElement } from '@innet/jsx';
import { type StateProp } from '../../../types';
export interface ShowProps {
    when: StateProp<any>;
}
export declare function show({ props: { when }, children }: JSXPluginElement<ShowProps>, handler: any): any;
