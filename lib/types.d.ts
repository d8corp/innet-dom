import { Handler } from 'innet';
export declare type ContentElements = TargetElements | Text;
export declare type TargetElements = Element | Comment;
export declare type UseComment = [Handler, Comment];
declare global {
    interface Comment {
        _children: ContentElements[];
        _parent?: Comment;
    }
    interface Element {
        _parent?: Comment;
    }
    interface Text {
        _parent?: Comment;
    }
}
