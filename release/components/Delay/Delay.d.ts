import { Context, EMPTY } from '@innet/jsx';
import { State } from 'watch-state';
import { type Ref } from '../../utils';
export declare const delayContext: Context<State<boolean> | undefined, State<boolean> | undefined>;
export declare function useHidden(): undefined | State<boolean>;
export interface DelayProps {
    show?: number;
    hide?: number;
    ref?: Ref<State<boolean>>;
    children?: JSX.Element;
}
export declare function Delay({ show, hide, ref, children }: DelayProps): typeof EMPTY | undefined;
