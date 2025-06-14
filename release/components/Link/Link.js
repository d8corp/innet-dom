'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsxRuntime = require('@innet/jsx/jsx-runtime');
var historyApi = require('@watch-state/history-api');
var classes = require('html-classes');
var watchState = require('watch-state');
require('../../hooks/index.js');
require('../../utils/index.js');
var useStyle = require('../../hooks/useStyle/useStyle.js');
var use = require('../../utils/use/use.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var classes__default = /*#__PURE__*/_interopDefaultLegacy(classes);

const defaultLinkClass = {
    root: undefined,
    active: undefined,
};
const CLEAR_HREF = /([?#].*)?$/;
function clearHref(url) {
    return url.replace(CLEAR_HREF, '');
}
function Link(props) {
    var _a, _b;
    const styles = useStyle.getStyles(defaultLinkClass, props);
    const { onclick, href, scroll, scrollTo, replace, exact } = props, rest = tslib.__rest(props, ["onclick", "href", "scroll", "scrollTo", "replace", "exact"]);
    if (!href || (typeof href === 'string' && href.startsWith('http'))) {
        return (jsxRuntime.jsx("a", Object.assign({}, rest, { class: () => styles.root, href: href, rel: (_a = rest.rel) !== null && _a !== void 0 ? _a : (href ? 'noopener noreferrer nofollow' : undefined), target: (_b = rest.target) !== null && _b !== void 0 ? _b : (href ? '_blank' : undefined), onclick: onclick })));
    }
    const getHref = (update) => use.use(href, update) || '';
    function createClassName() {
        const regString = new watchState.Cache(update => {
            const href = getHref(update);
            const prefix = href.startsWith('?')
                ? '[^?]*'
                : href.startsWith('#')
                    ? '[^#]*'
                    : '';
            return `^${prefix}${clearHref(href)}${exact ? '$' : ''}`;
        });
        const reg = new watchState.Cache(() => new RegExp(regString.value));
        return new watchState.Cache(() => {
            return classes__default["default"]([
                styles.root,
                reg.value.test(historyApi.locationURL.value) && styles.active,
            ]);
        });
    }
    const className = rest.class ? createClassName() : undefined;
    function handleClick(e) {
        if (e.ctrlKey || e.metaKey) {
            // @ts-expect-error TODO: fix types
            return onclick === null || onclick === void 0 ? void 0 : onclick.call(this, e);
        }
        const href = getHref(false);
        let url = href;
        const page = href === null || href === void 0 ? void 0 : href.startsWith('/');
        if (href === null || href === void 0 ? void 0 : href.startsWith('?')) {
            url = location.pathname + (href === '?' ? '' : href);
        }
        else if (href === null || href === void 0 ? void 0 : href.startsWith('#')) {
            url = location.pathname + location.search + (href === '#' ? '' : href);
        }
        else if (!page) {
            // @ts-expect-error TODO: fix types
            return onclick === null || onclick === void 0 ? void 0 : onclick.call(this, e);
        }
        e.preventDefault();
        const { scrollTo = page ? 0 : -1, scroll = 'before', replace } = props;
        const call = replace ? historyApi.historyReplace : historyApi.historyPush;
        call(url, scroll === 'none' ? -1 : scrollTo);
        // @ts-expect-error TODO: fix types
        onclick === null || onclick === void 0 ? void 0 : onclick.call(this, e);
    }
    return jsxRuntime.jsx("a", Object.assign({}, rest, { class: className, href: href, onclick: handleClick }));
}

exports.Link = Link;
exports.defaultLinkClass = defaultLinkClass;
