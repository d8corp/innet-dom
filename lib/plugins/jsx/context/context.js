'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

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
function context(_a, handler) {
    var props = _a.props, children = _a.children;
    var childrenHandler = Object.create(handler);
    childrenHandler[props.for.key] = props.set;
    return innet__default["default"](children, childrenHandler);
}

exports.Context = Context;
exports.context = context;
