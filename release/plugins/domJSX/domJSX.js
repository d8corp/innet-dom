'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
require('../../utils/index.js');
var setParent = require('../../utils/setParent/setParent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function domJSX() {
    return ({ type, props, children }, next, handler) => {
        if (typeof type === 'string') {
            const element = document.createElement(type);
            if (props) {
                for (let key in props) {
                    if (key === 'ref') {
                        if (props.ref) {
                            props.ref.value = element;
                        }
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
                                new watchState.Watch(update => {
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
            const result = innet__default["default"](element, handler);
            if (children) {
                const childrenHandler = Object.create(handler);
                setParent.setParent(childrenHandler, element);
                return innet__default["default"](children, childrenHandler);
            }
            return result;
        }
        return next();
    };
}

exports.domJSX = domJSX;
