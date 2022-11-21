import { useHandler } from '@innet/jsx';
import '../../utils/index.mjs';
import { getParent } from '../../utils/getParent/getParent.mjs';

function useParent() {
    return getParent(useHandler());
}

export { useParent };
