'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SyncTimer = require('sync-timer');
var watchState = require('watch-state');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var SyncTimer__default = /*#__PURE__*/_interopDefaultLegacy(SyncTimer);

function onMounted(callback, delay) {
    let destroyed = false;
    watchState.onDestroy(() => {
        destroyed = true;
    });
    new SyncTimer__default["default"](() => {
        if (!destroyed) {
            callback();
        }
    }, delay);
}

exports.onMounted = onMounted;
