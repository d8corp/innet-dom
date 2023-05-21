import { useApp } from 'innet';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { append } from '../../utils/dom/dom.es6.js';
import { useParent } from '../../hooks/useParent/useParent.es6.js';

function domNode() {
    return () => {
        append(useParent(), useApp());
    };
}

export { domNode };
