import innet, { useHandler, useApp } from 'innet';
import '../../../utils/index.es6.js';
import { getComment } from '../../../utils/getComment/getComment.es6.js';

function portal() {
    const handler = useHandler();
    const { props, children } = useApp();
    const [childHandler] = getComment(handler, 'portal', false, props.parent);
    innet(children, childHandler);
}

export { portal };
