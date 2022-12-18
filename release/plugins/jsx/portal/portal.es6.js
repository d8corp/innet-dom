import innet from 'innet';
import '../../../utils/index.es6.js';
import { getComment } from '../../../utils/getComment/getComment.es6.js';

function portal({ props, children }, handler) {
    const [childHandler] = getComment(handler, 'portal', false, props.parent);
    return innet(children, childHandler);
}

export { portal };
