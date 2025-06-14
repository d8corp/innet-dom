'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');

const paramsContext = new jsx.Context();
function useParams() {
    const params = jsx.useContext(paramsContext);
    if (!params) {
        throw Error('useParams must be used in Router');
    }
    return params;
}

exports.paramsContext = paramsContext;
exports.useParams = useParams;
