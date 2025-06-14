import { EMPTY } from '@innet/jsx';
import innet, { useHandler } from 'innet';
import '../../utils/index.es6.js';
import { getComment } from '../../utils/getComment/getComment.es6.js';

function Portal({ parent, children }) {
    const handler = useHandler();
    const [childHandler] = getComment(handler, 'portal', false, parent);
    innet(children, childHandler);
    return EMPTY;
}

export { Portal };
