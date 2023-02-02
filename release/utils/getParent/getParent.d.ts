import { type Handler } from 'innet';
import { type ParentElements } from '../../types';
export declare function getParent<T extends ParentElements>(handler: Handler): T;
