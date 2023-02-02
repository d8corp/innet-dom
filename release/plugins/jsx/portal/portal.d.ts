import { type JSXPluginElement } from '@innet/jsx';
import { type TargetElements } from '../../../types';
export interface PortalProps {
    parent: TargetElements | DocumentFragment;
}
export declare function portal({ props, children }: JSXPluginElement<PortalProps>, handler: any): any;
