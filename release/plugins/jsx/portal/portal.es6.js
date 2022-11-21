import innet from 'innet';
import '../../../utils/index.es6.js';
import { setParent } from '../../../utils/setParent/setParent.es6.js';

function portal({ props, children }, handler) {
    const childrenHandler = Object.create(handler);
    setParent(childrenHandler, props.parent);
    return innet(children, childrenHandler);
}

export { portal };
