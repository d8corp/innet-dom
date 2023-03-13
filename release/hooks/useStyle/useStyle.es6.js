import { useProps } from '@innet/jsx';
import classes from 'html-classes';

function getStyles(styles, props) {
    if (!(props === null || props === void 0 ? void 0 : props.class)) {
        return styles;
    }
    const className = props.class;
    if (typeof className !== 'object' || Array.isArray(className)) {
        const result = Object.assign({}, styles);
        Object.defineProperty(result, 'root', {
            get() {
                return classes([styles.root, className]);
            },
        });
        return result;
    }
    const result = {};
    for (const key in styles) {
        Object.defineProperty(result, key, {
            get() {
                return classes([
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
        const props = useProps();
        return getStyles(rest ? Object.assign({}, styles, rest) : styles, props);
    };
}

export { getStyles, style };
