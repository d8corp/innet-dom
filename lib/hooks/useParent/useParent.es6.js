import { useHandler } from '@innet/jsx';
import { getParent } from '../../utils/getParent/getParent.es6.js';
import 'watch-state';
import 'qs';

function useParent() {
    return getParent(useHandler());
}

export { useParent };
