import { JSXPluginElement } from '@innet/jsx';
import { Handler } from 'innet';
export interface SlotProps {
    name?: string;
}
export declare function getSlots(handler: Handler, from: any): Record<string, any>;
export declare function slot({ props, children }: JSXPluginElement<SlotProps>, handler: any): any;
