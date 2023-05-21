'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');

function statePropToWatchProp(value) {
    if (value instanceof watchState.Observable) {
        return () => value.value;
    }
    return value;
}

exports.statePropToWatchProp = statePropToWatchProp;
