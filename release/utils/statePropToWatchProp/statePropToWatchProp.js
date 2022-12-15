'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');

function statePropToWatchProp(value) {
    if (value instanceof watchState.State || value instanceof watchState.Cache) {
        const oldValue = value;
        return () => oldValue.value;
    }
    return value;
}

exports.statePropToWatchProp = statePropToWatchProp;
