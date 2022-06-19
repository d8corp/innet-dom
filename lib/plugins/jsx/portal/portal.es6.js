import innet from 'innet';
import { setParent } from '../../../utils/setParent/setParent.es6.js';
import 'watch-state';
import '@innet/jsx';

function portal({ props, children }, handler) {
    const childrenHandler = Object.create(handler);
    setParent(childrenHandler, props.parent);
    return innet(children, childrenHandler);
}

export { portal };
