'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../useParams/index.js');
var useParams = require('../useParams/useParams.js');

function useParam(name) {
    const params = useParams.useParams();
    return new watchState.Cache(() => params.value[name]);
}

exports.useParam = useParam;
