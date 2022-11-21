'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');

function useShow(delay = 100) {
    const show = new watchState.State(false);
    const timer = setTimeout(() => {
        show.value = true;
    }, delay);
    watchState.onDestroy(() => {
        clearTimeout(timer);
    });
    return show;
}

exports.useShow = useShow;
