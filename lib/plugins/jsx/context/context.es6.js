import innet from 'innet';

class Context {
    constructor(defaultValue, name) {
        this.defaultValue = defaultValue;
        this.key = Symbol(name);
    }
    get(handler) {
        return this.key in handler ? handler[this.key] : this.defaultValue;
    }
}
function context({ props, children }, handler) {
    const childrenHandler = Object.create(handler);
    childrenHandler[props.for.key] = props.set;
    return innet(children, childrenHandler);
}

export { Context, context };
