import '../../utils/dom/index.mjs';
import '../../utils/getParent/index.mjs';
import { getParent } from '../../utils/getParent/getParent.mjs';
import { append } from '../../utils/dom/dom.mjs';

function domNode() {
    return (node, next, handler) => {
        const parent = getParent(handler);
        append(parent, node);
        return parent;
    };
}

export { domNode };
