import { PARENT } from '../../constants.mjs';

function setParent(handler, parent) {
    handler[PARENT] = parent;
}

export { setParent };
