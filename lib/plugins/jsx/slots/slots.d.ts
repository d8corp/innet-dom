import { JSXPluginElement } from '@innet/jsx';
import { Context } from '../context';
export interface SlotsProps {
    from: any;
}
export declare const slotsContext: Context<any, {}>;
export declare function slots({ props: { from }, children }: JSXPluginElement<SlotsProps>, handler: any): any;
