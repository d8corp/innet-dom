'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var classes = require('html-classes');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var classes__default = /*#__PURE__*/_interopDefaultLegacy(classes);

function getStyles(styles, props) {
    if (!(props === null || props === void 0 ? void 0 : props.class)) {
        return styles;
    }
    const className = props.class;
    if (typeof className !== 'object' || Array.isArray(className)) {
        const result = Object.assign({}, styles);
        Object.defineProperty(result, 'root', {
            get() {
                return classes__default["default"]([styles.root, className]);
            },
        });
        return result;
    }
    const result = {};
    for (const key in styles) {
        Object.defineProperty(result, key, {
            get() {
                return classes__default["default"]([
                    styles[key],
                    className[key],
                ]);
            },
        });
    }
    return result;
}
function style(styles, rest) {
    return function useStyle() {
        const props = jsx.useProps();
        return getStyles(rest ? Object.assign({}, styles, rest) : styles, props);
    };
}

exports.getStyles = getStyles;
exports.style = style;
