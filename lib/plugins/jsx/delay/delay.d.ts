import { JSXPluginElement } from '@innet/jsx';
import { Handler } from 'innet';
import { State } from 'watch-state';
import { Ref } from '../../../utils';
import { Context } from '../context';
export interface DelayProps {
    show?: number;
    hide?: number;
    ref?: Ref<State<boolean>>;
}
export declare const delayContext: Context<State<boolean>, State<boolean>>;
export declare function useHidden(): undefined | State<boolean>;
export declare function delay({ props, children }: JSXPluginElement<DelayProps>, handler: Handler): any;
