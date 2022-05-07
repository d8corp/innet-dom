import { Context } from '../context';
export interface SlotsProps {
    from: any;
}
export declare const slotsContext: Context<any, {}>;
export declare function slots({ props: { from }, children }: {
    props: {
        from: any;
    };
    children: any;
}, handler: any): any;
