'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var getParent = require('../../utils/getParent/getParent.js');
require('watch-state');
require('tslib');
require('qs');

function useParent() {
    return getParent.getParent(jsx.useHandler());
}

exports.useParent = useParent;
