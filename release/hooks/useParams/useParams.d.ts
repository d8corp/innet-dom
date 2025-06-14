import { Context } from '@innet/jsx';
import { type State } from 'watch-state';
export declare const paramsContext: Context<State<Record<string, string>>, State<Record<string, string>> | undefined>;
export declare function useParams<T extends Record<string, string>>(): State<T>;
