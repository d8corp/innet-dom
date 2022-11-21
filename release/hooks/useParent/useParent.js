'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
require('../../utils/index.js');
var getParent = require('../../utils/getParent/getParent.js');

function useParent() {
    return getParent.getParent(jsx.useHandler());
}

exports.useParent = useParent;
