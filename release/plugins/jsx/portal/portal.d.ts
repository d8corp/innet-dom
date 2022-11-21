import { JSXPluginElement } from '@innet/jsx';
import { TargetElements } from '../../../types';
export interface PortalProps {
    parent: TargetElements | DocumentFragment;
}
export declare function portal({ props, children }: JSXPluginElement<PortalProps>, handler: any): any;
