export interface PipeProps {
    deep?: number;
    children: (children: JSX.Element, deep: number) => JSX.Element;
}
export declare function Pipe({ deep, children }: PipeProps): JSX.Element;
