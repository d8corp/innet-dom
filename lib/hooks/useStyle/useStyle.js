'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsx = require('@innet/jsx');
var classes = require('html-classes');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var classes__default = /*#__PURE__*/_interopDefaultLegacy(classes);

function getStyles(styles, props) {
    if (!props || !props.class) {
        return styles;
    }
    var className = props.class;
    if (typeof className !== 'object' || Array.isArray(className)) {
        var result_1 = tslib.__assign({}, styles);
        Object.defineProperty(result_1, 'root', {
            get: function () {
                // @ts-ignore
                return classes__default["default"]([styles.root, className]);
            },
        });
        return result_1;
    }
    var result = {};
    var _loop_1 = function (key) {
        Object.defineProperty(result, key, {
            get: function () {
                return classes__default["default"]([
                    styles[key],
                    className[key],
                ]);
            },
        });
    };
    for (var key in styles) {
        _loop_1(key);
    }
    return result;
}
function style(styles) {
    return function useStyle() {
        var props = jsx.useProps();
        return getStyles(styles, props);
    };
}

exports.getStyles = getStyles;
exports.style = style;
