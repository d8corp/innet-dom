const scope = {};
function setTimeoutSync(handler, timeout = 0) {
    if (scope[timeout]) {
        scope[timeout].handlers.push(handler);
        return scope[timeout].timer;
    }
    const timer = scope[timeout] = {
        handlers: [handler],
        timer: setTimeout(() => {
            timer.handlers.forEach(run => run());
        }, timeout),
    };
    setTimeout(() => {
        scope[timeout] = undefined;
    });
    return timer.timer;
}

export { setTimeoutSync };
