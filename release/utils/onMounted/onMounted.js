'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../setTimeoutSync/index.js');
var setTimeoutSync = require('../setTimeoutSync/setTimeoutSync.js');

function onMounted(callback, delay) {
    let destroyed = false;
    watchState.onDestroy(() => {
        destroyed = true;
    });
    setTimeoutSync.setTimeoutSync(() => {
        if (!destroyed) {
            callback();
        }
    }, delay);
}

exports.onMounted = onMounted;
