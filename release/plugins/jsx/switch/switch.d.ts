import { type JSXPluginElement } from '@innet/jsx';
import { type StateProp } from '../../../types';
export interface SwitchProps {
    of: StateProp<string | number>;
}
export declare function switchPlugin({ props: { of }, children }: JSXPluginElement<SwitchProps>, handler: any): any;
