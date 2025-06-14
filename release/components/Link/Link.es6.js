import { __rest } from 'tslib';
import { jsx } from '@innet/jsx/jsx-runtime';
import { locationURL, historyReplace, historyPush } from '@watch-state/history-api';
import classes from 'html-classes';
import { Cache } from 'watch-state';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { getStyles } from '../../hooks/useStyle/useStyle.es6.js';
import { use } from '../../utils/use/use.es6.js';

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
    const styles = getStyles(defaultLinkClass, props);
    const { onclick, href, scroll, scrollTo, replace, exact } = props, rest = __rest(props, ["onclick", "href", "scroll", "scrollTo", "replace", "exact"]);
    if (!href || (typeof href === 'string' && href.startsWith('http'))) {
        return (jsx("a", Object.assign({}, rest, { class: () => styles.root, href: href, rel: (_a = rest.rel) !== null && _a !== void 0 ? _a : (href ? 'noopener noreferrer nofollow' : undefined), target: (_b = rest.target) !== null && _b !== void 0 ? _b : (href ? '_blank' : undefined), onclick: onclick })));
    }
    const getHref = (update) => use(href, update) || '';
    function createClassName() {
        const regString = new Cache(update => {
            const href = getHref(update);
            const prefix = href.startsWith('?')
                ? '[^?]*'
                : href.startsWith('#')
                    ? '[^#]*'
                    : '';
            return `^${prefix}${clearHref(href)}${exact ? '$' : ''}`;
        });
        const reg = new Cache(() => new RegExp(regString.value));
        return new Cache(() => {
            return classes([
                styles.root,
                reg.value.test(locationURL.value) && styles.active,
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
        const call = replace ? historyReplace : historyPush;
        call(url, scroll === 'none' ? -1 : scrollTo);
        // @ts-expect-error TODO: fix types
        onclick === null || onclick === void 0 ? void 0 : onclick.call(this, e);
    }
    return jsx("a", Object.assign({}, rest, { class: className, href: href, onclick: handleClick }));
}

export { Link, defaultLinkClass };
