import innet from 'innet';
import '../../../utils/index.mjs';
import { setParent } from '../../../utils/setParent/setParent.mjs';

function portal({ props, children }, handler) {
    const childrenHandler = Object.create(handler);
    setParent(childrenHandler, props.parent);
    return innet(children, childrenHandler);
}

export { portal };
