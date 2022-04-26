import { append } from '../../utils/dom/dom.es6.js';
import { getParent } from '../../utils/getParent/getParent.es6.js';

function domNode() {
    return (node, next, handler) => {
        const parent = getParent(handler);
        append(parent, node);
        return parent;
    };
}

export { domNode };
