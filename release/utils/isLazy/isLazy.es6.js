import { LAZY } from '../../constants.es6.js';

function isLazy(value) {
    return LAZY in value;
}

export { isLazy };
