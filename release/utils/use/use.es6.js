function use(prop, update = false) {
    // @ts-expect-error
    return typeof prop === 'function' ? prop(update) : prop;
}

export { use };
