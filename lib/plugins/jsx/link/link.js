'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var router = require('../router/router.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function link(_a, oldHandler) {
    var type = _a.type, props = _a.props, children = _a.children;
    var handler = Object.create(oldHandler);
    handler[type] = undefined;
    if (!props || !props.href) {
        return innet__default["default"]({
            type: 'a',
            props: props,
            children: children,
        }, handler);
    }
    var onclick = props.onclick, href = props.href, classes = props.classes;
    if (classes) {
        var className = props.class, exact_1 = props.exact;
        delete props.classes;
        delete props.exact;
        if (classes.active) {
            var postfix_1 = className && classes.root ? "".concat(className, " ").concat(classes.root) : className || classes.root;
            var prefix_1 = '';
            if (href.startsWith('?')) {
                prefix_1 = '[^?]*';
            }
            else if (href.startsWith('#')) {
                prefix_1 = '[^#]*';
            }
            else if (!href.startsWith('/')) {
                return false;
            }
            props.class = (function () { return !router.history.is("^".concat(prefix_1).concat(href).concat(exact_1 ? '$' : '')) ? postfix_1 : postfix_1 ? "".concat(postfix_1, " ").concat(classes.active) : classes.active; });
        }
        else if (classes.root) {
            props.class = className ? "".concat(className, " ").concat(classes.root) : classes.root;
        }
    }
    props.onclick = function (e) {
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
        var _a = props.scrollTo, scrollTo = _a === void 0 ? page ? 0 : -1 : _a, scroll = props.scroll, replace = props.replace;
        router.history[replace ? 'replace' : 'push'](url, scroll === 'none' ? -1 : scrollTo, scroll === 'before');
        onclick === null || onclick === void 0 ? void 0 : onclick(e);
    };
    if (href.startsWith('http')) {
        if (!props.rel) {
            props.rel = 'noopener noreferrer nofollow';
        }
        if (!props.target) {
            props.target = '_blank';
        }
    }
    else {
        props.href = (function () {
            var locale = router.history.locale;
            return !locale ? href : href === '/' ? "/".concat(locale) : "/".concat(locale).concat(href);
        });
    }
    return innet__default["default"]({
        type: 'a',
        props: props,
        children: children,
    }, handler);
}

exports.link = link;
