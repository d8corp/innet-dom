import { useHandler } from '@innet/jsx';
import { getParent } from '../getParent/getParent.es6.js';

function useParent() {
    return getParent(useHandler());
}

export { useParent };
