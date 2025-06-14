import type { StateProp } from '../../types';
export interface HideProps {
    when: StateProp<any>;
    children?: JSX.Element;
    fallback?: JSX.Element;
}
export declare function Hide({ when, children, fallback }: HideProps): JSX.Element | import("watch-state").Watcher<JSX.Element>;
