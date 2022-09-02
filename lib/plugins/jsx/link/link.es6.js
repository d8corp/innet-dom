import innet from 'innet';
import { history } from '../router/router.es6.js';

function link({ type, props, children }, oldHandler) {
    const handler = Object.create(oldHandler);
    handler[type] = undefined;
    if (!props || !props.href) {
        return innet({
            type: 'a',
            props,
            children,
        }, handler);
    }
    const { onclick, href, classes } = props;
    if (classes) {
        const { class: className, exact } = props;
        delete props.classes;
        delete props.exact;
        if (classes.active) {
            const postfix = className && classes.root ? `${className} ${classes.root}` : className || classes.root;
            let prefix = '';
            if (href.startsWith('?')) {
                prefix = '[^?]*';
            }
            else if (href.startsWith('#')) {
                prefix = '[^#]*';
            }
            else if (!href.startsWith('/')) {
                return false;
            }
            props.class = (() => !history.is(`^${prefix}${href}${exact ? '$' : ''}`) ? postfix : postfix ? `${postfix} ${classes.active}` : classes.active);
        }
        else if (classes.root) {
            props.class = className ? `${className} ${classes.root}` : classes.root;
        }
    }
    props.onclick = (e) => {
        let url = href;
        const page = href.startsWith('/');
        if (href.startsWith('?')) {
            url = history.path + (href === '?' ? '' : href);
        }
        else if (href.startsWith('#')) {
            url = history.path + location.search + (href === '#' ? '' : href);
        }
        else if (!page) {
            return onclick === null || onclick === void 0 ? void 0 : onclick(e);
        }
        e.preventDefault();
        const { scrollTo = page ? 0 : -1, scroll = 'before', replace } = props;
        history[replace ? 'replace' : 'push'](url, scroll === 'none' ? -1 : scrollTo, scroll === 'before');
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
        props.href = (() => {
            const { locale } = history;
            return !locale ? href : href === '/' ? `/${locale}` : `/${locale}${href}`;
        });
    }
    return innet({
        type: 'a',
        props,
        children,
    }, handler);
}

export { link };
