import { ContentElements, TargetElements } from '../../types';
export declare function clear(target: Comment, delay?: number): void;
export declare function remove(target: ContentElements): void;
export declare function before(target: TargetElements, node: ContentElements): void;
export declare function prepend(target: TargetElements | DocumentFragment, node: ContentElements): void;
export declare function append(target: TargetElements | DocumentFragment, node: ContentElements): void;
export declare function after(target: TargetElements, node: ContentElements): void;
