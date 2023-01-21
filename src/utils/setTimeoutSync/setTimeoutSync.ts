interface Timer {
  handlers: Function[]
  timer: any
}

const scope: Record<number, Timer> = {}

export function setTimeoutSync (handler: Function, timeout = 0) {
  if (scope[timeout]) {
    scope[timeout].handlers.push(handler)

    return scope[timeout].timer
  }

  const timer = scope[timeout] = {
    handlers: [],
    timer: setTimeout(() => {
      timer.handlers.forEach(run => run())
    }, timeout),
  }

  setTimeout(() => {
    scope[timeout] = undefined
  })

  return timer.timer
}
