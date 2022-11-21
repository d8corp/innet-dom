import { PARENT } from '../../constants.mjs';

function getParent(handler) {
    return handler[PARENT] || document.body;
}

export { getParent };
