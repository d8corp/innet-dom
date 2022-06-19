'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var innet = require('innet');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function useContext(context) {
    var handler = jsx.useHandler();
    return context.get(handler);
}
var Context = /** @class */ (function () {
    function Context(defaultValue, name) {
        this.defaultValue = defaultValue;
        this.key = Symbol(name);
    }
    Context.prototype.get = function (handler) {
        return this.key in handler ? handler[this.key] : this.defaultValue;
    };
    return Context;
}());
function createContextHandler(handler, context, value) {
    var childrenHandler = Object.create(handler);
    childrenHandler[context.key] = value;
    return childrenHandler;
}
function context(_a, handler) {
    var props = _a.props, children = _a.children;
    return innet__default["default"](children, createContextHandler(handler, props.for, props.set));
}

exports.Context = Context;
exports.context = context;
exports.createContextHandler = createContextHandler;
exports.useContext = useContext;
