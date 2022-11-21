import { PARENT } from '../../constants.es6.js';

function getParent(handler) {
    return handler[PARENT] || document.body;
}

export { getParent };
