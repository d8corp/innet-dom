'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsx = require('@innet/jsx');
var historyApi = require('@watch-state/history-api');
var classes = require('html-classes');
var innet = require('innet');
var watchState = require('watch-state');
require('../../../hooks/useStyle/index.js');
require('../../../utils/index.js');
var useStyle = require('../../../hooks/useStyle/useStyle.js');
var use = require('../../../utils/use/use.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var classes__default = /*#__PURE__*/_interopDefaultLegacy(classes);
var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const defaultClass = {
    root: undefined,
    active: undefined,
};
const CLEAR_HREF = /([?#].*)?$/;
function clearHref(url) {
    return url.replace(CLEAR_HREF, '');
}
function link() {
    var _a, _b;
    const { type, props, children } = innet.useApp();
    const handler = Object.create(innet.useHandler());
    handler[jsx.JSX_PLUGINS] = Object.create(handler[jsx.JSX_PLUGINS]);
    handler[jsx.JSX_PLUGINS][type] = undefined;
    if (!props) {
        innet__default["default"]({ type: 'a', children }, handler);
        return;
    }
    const styles = useStyle.getStyles(defaultClass, props);
    const { onclick, href, scroll, scrollTo, replace, exact } = props, rest = tslib.__rest(props, ["onclick", "href", "scroll", "scrollTo", "replace", "exact"]);
    if (!href || (typeof href === 'string' && href.startsWith('http'))) {
        innet__default["default"]({
            type: 'a',
            props: Object.assign(Object.assign({}, rest), { class: () => styles.root, href, rel: (_a = rest.rel) !== null && _a !== void 0 ? _a : (href ? 'noopener noreferrer nofollow' : undefined), target: (_b = rest.target) !== null && _b !== void 0 ? _b : (href ? '_blank' : undefined), onclick }),
            children,
        }, handler);
        return;
    }
    const getHref = (update) => use.use(href, update);
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
        return new watchState.Cache(update => {
            return classes__default["default"]([
                styles.root,
                reg.value.test(historyApi.locationURL.value) && styles.active,
            ]);
        });
    }
    const className = rest.class && createClassName();
    function handleClick(e) {
        if (e.ctrlKey || e.metaKey)
            return onclick === null || onclick === void 0 ? void 0 : onclick.call(this, e);
        const href = getHref(false);
        let url = href;
        const page = href.startsWith('/');
        if (href.startsWith('?')) {
            url = location.pathname + (href === '?' ? '' : href);
        }
        else if (href.startsWith('#')) {
            url = location.pathname + location.search + (href === '#' ? '' : href);
        }
        else if (!page) {
            return onclick === null || onclick === void 0 ? void 0 : onclick.call(this, e);
        }
        e.preventDefault();
        const { scrollTo = page ? 0 : -1, scroll = 'before', replace } = props;
        const call = replace ? historyApi.historyReplace : historyApi.historyPush;
        call(url, scroll === 'none' ? -1 : scrollTo);
        onclick === null || onclick === void 0 ? void 0 : onclick.call(this, e);
    }
    innet__default["default"]({
        type: 'a',
        props: Object.assign(Object.assign({}, rest), { class: className, href, onclick: handleClick }),
        children,
    }, handler);
}

exports.defaultClass = defaultClass;
exports.link = link;
