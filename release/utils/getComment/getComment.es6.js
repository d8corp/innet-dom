import { onDestroy } from 'watch-state';
import '../dom/index.es6.js';
import '../getParent/index.es6.js';
import '../setParent/index.es6.js';
import { setParent } from '../setParent/setParent.es6.js';
import { append, remove } from '../dom/dom.es6.js';
import { getParent } from '../getParent/getParent.es6.js';

function getComment(handler, name, freeParent = false, parent = getParent(handler)) {
    const comment = document.createComment(name);
    const childHandler = Object.create(handler);
    setParent(childHandler, comment);
    append(parent, comment);
    if (!freeParent) {
        onDestroy(() => remove(comment));
    }
    return [childHandler, comment];
}

export { getComment };
