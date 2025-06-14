import type { StateProp } from '../../types';
export interface ShowProps {
    when: StateProp<any>;
    children?: JSX.Element;
    fallback?: JSX.Element;
}
export declare function Show({ when, children, fallback }: ShowProps): JSX.Element | import("watch-state").Watcher<JSX.Element>;
