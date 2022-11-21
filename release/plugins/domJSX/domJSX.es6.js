import innet from 'innet';
import { Watch } from 'watch-state';
import '../../utils/index.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';

function domJSX() {
    return ({ type, props, children }, next, handler) => {
        if (typeof type === 'string') {
            const element = document.createElement(type);
            if (props) {
                for (let key in props) {
                    if (key === 'ref') {
                        props.ref.value = element;
                    }
                    else {
                        const value = props[key];
                        if (key.startsWith('on')) {
                            element[key] = value;
                        }
                        else {
                            const bothSet = key[0] === '$';
                            const fieldSet = bothSet || key[0] === '_';
                            const attributeSet = bothSet || !fieldSet;
                            if (fieldSet) {
                                key = key.slice(1);
                            }
                            if (typeof value === 'function') {
                                new Watch(update => {
                                    const result = value(update);
                                    if (fieldSet && element[key] !== result) {
                                        element[key] = result;
                                    }
                                    if (attributeSet) {
                                        if (result === undefined) {
                                            element.removeAttribute(key);
                                        }
                                        else {
                                            element.setAttribute(key, result);
                                        }
                                    }
                                });
                            }
                            else {
                                if (fieldSet) {
                                    element[key] = value;
                                }
                                if (attributeSet && value !== undefined) {
                                    element.setAttribute(key, value);
                                }
                            }
                        }
                    }
                }
            }
            const result = innet(element, handler);
            if (children) {
                const childrenHandler = Object.create(handler);
                setParent(childrenHandler, element);
                return innet(children, childrenHandler);
            }
            return result;
        }
        return next();
    };
}

export { domJSX };
