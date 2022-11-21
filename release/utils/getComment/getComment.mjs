import { onDestroy } from 'watch-state';
import '../dom/index.mjs';
import '../getParent/index.mjs';
import '../setParent/index.mjs';
import { getParent } from '../getParent/getParent.mjs';
import { setParent } from '../setParent/setParent.mjs';
import { append, remove } from '../dom/dom.mjs';

function getComment(handler, name, freeParent = false) {
    const comment = document.createComment(name);
    const parent = getParent(handler);
    const childHandler = Object.create(handler);
    setParent(childHandler, comment);
    append(parent, comment);
    if (!freeParent) {
        onDestroy(() => remove(comment));
    }
    return [childHandler, comment];
}

export { getComment };
