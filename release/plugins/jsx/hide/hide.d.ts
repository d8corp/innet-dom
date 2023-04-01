import { type JSXPluginElement } from '@innet/jsx';
import { type StateProp } from '../../../types';
export interface HideProps {
    when: StateProp<any>;
}
export declare function hide({ props: { when }, children }: JSXPluginElement<HideProps>, handler: any): any;
