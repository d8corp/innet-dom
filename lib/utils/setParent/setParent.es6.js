import { PARENT } from '../../constants.es6.js';

function setParent(handler, parent) {
    handler[PARENT] = parent;
}

export { setParent };
