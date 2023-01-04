import innet from 'innet';
import { Watch } from 'watch-state';
import '../../utils/index.es6.js';
import { statePropToWatchProp } from '../../utils/statePropToWatchProp/statePropToWatchProp.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';

const NAMESPACE_URI = Symbol('NAMESPACE_URI');
function domJSX() {
    return ({ type, props, children }, next, handler) => {
        if (typeof type !== 'string')
            return next();
        if (type === 'svg') {
            handler = Object.create(handler);
            handler[NAMESPACE_URI] = 'http://www.w3.org/2000/svg';
        }
        const element = handler[NAMESPACE_URI]
            ? document.createElementNS(handler[NAMESPACE_URI], type)
            : document.createElement(type);
        if (props) {
            for (let key in props) {
                if (key === 'ref') {
                    if (props.ref) {
                        props.ref.value = element;
                    }
                    continue;
                }
                let value = props[key];
                if (key === 'style') {
                    for (const property in value) {
                        const rawValue = statePropToWatchProp(value[property]);
                        if (typeof rawValue === 'function') {
                            new Watch(update => {
                                element.style.setProperty(property, rawValue(update));
                            });
                        }
                        else {
                            element.style.setProperty(property, rawValue);
                        }
                    }
                    continue;
                }
                if (key.startsWith('on')) {
                    element[key] = value;
                    continue;
                }
                const bothSet = key[0] === '$';
                const fieldSet = bothSet || key[0] === '_';
                const attributeSet = bothSet || !fieldSet;
                if (fieldSet) {
                    key = key.slice(1);
                }
                value = statePropToWatchProp(value);
                if (typeof value === 'function') {
                    new Watch(update => {
                        const result = value(update);
                        if (fieldSet && element[key] !== result) {
                            element[key] = result;
                        }
                        if (attributeSet) {
                            if (result === undefined || result === false) {
                                if (update) {
                                    element.removeAttribute(key);
                                }
                            }
                            else {
                                element.setAttribute(key, result === true ? '' : result);
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
        const result = innet(element, handler);
        if (children) {
            const childrenHandler = Object.create(handler);
            setParent(childrenHandler, element);
            return innet(children, childrenHandler);
        }
        return result;
    };
}

export { NAMESPACE_URI, domJSX };
