import type { TargetElements } from '../../types';
export interface PortalProps {
    parent: TargetElements | DocumentFragment;
    children?: JSX.Element;
}
export declare function Portal({ parent, children }: PortalProps): symbol;
