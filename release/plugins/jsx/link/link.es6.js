import { __rest } from 'tslib';
import { JSX_PLUGINS } from '@innet/jsx';
import { locationURL, historyReplace, historyPush } from '@watch-state/history-api';
import classes from 'html-classes';
import innet, { useApp, useHandler } from 'innet';
import { Cache } from 'watch-state';
import '../../../hooks/useStyle/index.es6.js';
import '../../../utils/index.es6.js';
import { getStyles } from '../../../hooks/useStyle/useStyle.es6.js';
import { use } from '../../../utils/use/use.es6.js';

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
    const { type, props, children } = useApp();
    const handler = Object.create(useHandler());
    handler[JSX_PLUGINS] = Object.create(handler[JSX_PLUGINS]);
    handler[JSX_PLUGINS][type] = undefined;
    if (!props) {
        innet({ type: 'a', children }, handler);
        return;
    }
    const styles = getStyles(defaultClass, props);
    const { onclick, href, scroll, scrollTo, replace, exact } = props, rest = __rest(props, ["onclick", "href", "scroll", "scrollTo", "replace", "exact"]);
    if (!href || (typeof href === 'string' && href.startsWith('http'))) {
        innet({
            type: 'a',
            props: Object.assign(Object.assign({}, rest), { class: () => styles.root, href, rel: (_a = rest.rel) !== null && _a !== void 0 ? _a : (href ? 'noopener noreferrer nofollow' : undefined), target: (_b = rest.target) !== null && _b !== void 0 ? _b : (href ? '_blank' : undefined), onclick }),
            children,
        }, handler);
        return;
    }
    const getHref = (update) => use(href, update);
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
        return new Cache(update => {
            return classes([
                styles.root,
                reg.value.test(locationURL.value) && styles.active,
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
        const call = replace ? historyReplace : historyPush;
        call(url, scroll === 'none' ? -1 : scrollTo);
        onclick === null || onclick === void 0 ? void 0 : onclick.call(this, e);
    }
    innet({
        type: 'a',
        props: Object.assign(Object.assign({}, rest), { class: className, href, onclick: handleClick }),
        children,
    }, handler);
}

export { defaultClass, link };
