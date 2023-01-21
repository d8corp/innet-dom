'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const scope = {};
function setTimeoutSync(handler, timeout = 0) {
    if (scope[timeout]) {
        scope[timeout].handlers.push(handler);
        return scope[timeout].timer;
    }
    const timer = scope[timeout] = {
        handlers: [],
        timer: setTimeout(() => {
            timer.handlers.forEach(run => run());
        }, timeout),
    };
    setTimeout(() => {
        scope[timeout] = undefined;
    });
    return timer.timer;
}

exports.setTimeoutSync = setTimeoutSync;
