'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var getParent = require('../getParent/getParent.js');

function useParent() {
    return getParent.getParent(jsx.useHandler());
}

exports.useParent = useParent;
