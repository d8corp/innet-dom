'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var classes = require('html-classes');
var innet = require('innet');
var useStyle = require('../../../hooks/useStyle/useStyle.js');
var router = require('../router/router.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var classes__default = /*#__PURE__*/_interopDefaultLegacy(classes);
var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

var defaultClass = {
    root: undefined,
    active: undefined,
};
function link(_a, oldHandler) {
    var _b, _c;
    var type = _a.type, props = _a.props, children = _a.children;
    var handler = Object.create(oldHandler);
    handler[type] = undefined;
    if (!props)
        return innet__default["default"]({ type: 'a', children: children }, handler);
    var styles = useStyle.getStyles(defaultClass, props);
    var onclick = props.onclick, href = props.href; props.scroll; props.scrollTo; props.replace; var exact = props.exact, rest = tslib.__rest(props, ["onclick", "href", "scroll", "scrollTo", "replace", "exact"]);
    if (!href || href.startsWith('http')) {
        return innet__default["default"]({
            type: 'a',
            props: tslib.__assign(tslib.__assign({}, rest), { class: function () { return styles.root; }, href: href, rel: (_b = rest.rel) !== null && _b !== void 0 ? _b : (href ? 'noopener noreferrer nofollow' : undefined), target: (_c = rest.target) !== null && _c !== void 0 ? _c : (href ? '_blank' : undefined), onclick: onclick }),
            children: children,
        }, handler);
    }
    var getClass = function () {
        if (!rest.class)
            return;
        var prefix = href.startsWith('?')
            ? '[^?]*'
            : href.startsWith('#')
                ? '[^#]*' : '';
        return function () { return classes__default["default"]([
            styles.root,
            router.history.is("^".concat(prefix).concat(href).concat(exact ? '$' : '')) && styles.active,
        ]); };
    };
    var handleClick = function (e) {
        var url = href;
        var page = href.startsWith('/');
        if (href.startsWith('?')) {
            url = router.history.path + (href === '?' ? '' : href);
        }
        else if (href.startsWith('#')) {
            url = router.history.path + location.search + (href === '#' ? '' : href);
        }
        else if (!page) {
            return onclick === null || onclick === void 0 ? void 0 : onclick(e);
        }
        e.preventDefault();
        var _a = props.scrollTo, scrollTo = _a === void 0 ? page ? 0 : -1 : _a, _b = props.scroll, scroll = _b === void 0 ? 'before' : _b, replace = props.replace;
        router.history[replace ? 'replace' : 'push'](url, scroll === 'none' ? -1 : scrollTo, scroll === 'before');
        onclick === null || onclick === void 0 ? void 0 : onclick(e);
    };
    return innet__default["default"]({
        type: 'a',
        props: tslib.__assign(tslib.__assign({}, rest), { class: getClass(), href: function () {
                var locale = router.history.locale;
                return !locale ? href : href === '/' ? "/".concat(locale) : "/".concat(locale).concat(href);
            }, onclick: handleClick }),
        children: children,
    }, handler);
}

exports.defaultClass = defaultClass;
exports.link = link;
