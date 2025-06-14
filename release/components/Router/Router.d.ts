import { type StateProp } from '../../types';
import { type Routing } from './types';
export interface RouterProps {
    routing: StateProp<Routing>;
    permissions?: StateProp<Set<string>>;
}
export declare function Router({ routing, permissions }: RouterProps): JSX.Element;
