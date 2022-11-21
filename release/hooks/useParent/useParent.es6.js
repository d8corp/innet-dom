import { useHandler } from '@innet/jsx';
import '../../utils/index.es6.js';
import { getParent } from '../../utils/getParent/getParent.es6.js';

function useParent() {
    return getParent(useHandler());
}

export { useParent };
