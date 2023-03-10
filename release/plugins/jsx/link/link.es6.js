import { __rest } from 'tslib';
import classes from 'html-classes';
import innet from 'innet';
import '../../../hooks/useStyle/index.es6.js';
import '../../../utils/index.es6.js';
import '../router/index.es6.js';
import { getStyles } from '../../../hooks/useStyle/useStyle.es6.js';
import { use } from '../../../utils/use/use.es6.js';
import { history } from '../router/router.es6.js';

const defaultClass = {
    root: undefined,
    active: undefined,
};
const CLEAR_HREF = /([?#].*)?$/;
function clearHref(url) {
    return url.replace(CLEAR_HREF, '');
}
function link({ type, props, children }, oldHandler) {
    var _a, _b;
    const handler = Object.create(oldHandler);
    handler[type] = undefined;
    if (!props)
        return innet({ type: 'a', children }, handler);
    const styles = getStyles(defaultClass, props);
    const { onclick, href, scroll, scrollTo, replace, exact } = props, rest = __rest(props, ["onclick", "href", "scroll", "scrollTo", "replace", "exact"]);
    const getHref = (update) => use(href, update);
    if (!href || (typeof href === 'string' && href.startsWith('http'))) {
        return innet({
            type: 'a',
            props: Object.assign(Object.assign({}, rest), { class: () => styles.root, href, rel: (_a = rest.rel) !== null && _a !== void 0 ? _a : (href ? 'noopener noreferrer nofollow' : undefined), target: (_b = rest.target) !== null && _b !== void 0 ? _b : (href ? '_blank' : undefined), onclick }),
            children,
        }, handler);
    }
    const getClass = () => {
        if (!rest.class)
            return;
        return (update) => {
            const href = getHref(update);
            const prefix = href.startsWith('?')
                ? '[^?]*'
                : href.startsWith('#')
                    ? '[^#]*'
                    : '';
            return classes([
                styles.root,
                history.is(`^${prefix}${clearHref(href)}${exact ? '$' : ''}`) && styles.active,
            ]);
        };
    };
    const handleClick = e => {
        const href = getHref(false);
        let url = href;
        const page = href.startsWith('/');
        if (href.startsWith('?')) {
            url = history.path + (href === '?' ? '' : href);
        }
        else if (href.startsWith('#')) {
            url = history.path + location.search + (href === '#' ? '' : href);
        }
        else if (!page) {
            return onclick === null || onclick === void 0 ? void 0 : onclick.call(window, e);
        }
        e.preventDefault();
        const { scrollTo = page ? 0 : -1, scroll = 'before', replace } = props;
        history[replace ? 'replace' : 'push'](url, scroll === 'none' ? -1 : scrollTo, scroll === 'before');
        onclick === null || onclick === void 0 ? void 0 : onclick.call(window, e);
    };
    return innet({
        type: 'a',
        props: Object.assign(Object.assign({}, rest), { class: getClass(), href: (update) => {
                const { locale } = history;
                const href = getHref(update);
                if (!locale) {
                    return href;
                }
                return href === '/' ? `/${locale}` : `/${locale}${href}`;
            }, onclick: handleClick }),
        children,
    }, handler);
}

export { defaultClass, link };
