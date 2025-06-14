'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var innet = require('innet');
var watchState = require('watch-state');
require('../../utils/index.js');
var statePropToWatchProp = require('../../utils/statePropToWatchProp/statePropToWatchProp.js');
var setParent = require('../../utils/setParent/setParent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const NAMESPACE_URI = Symbol('NAMESPACE_URI');
function domJSX() {
    return () => {
        const { type, props } = innet.useApp();
        const children = jsx.useChildren();
        let handler = innet.useHandler();
        if (typeof type !== 'string')
            return innet.NEXT;
        if (type === 'svg') {
            handler = Object.create(handler);
            handler[NAMESPACE_URI] = 'http://www.w3.org/2000/svg';
        }
        const element = handler[NAMESPACE_URI]
            ? document.createElementNS(handler[NAMESPACE_URI], type)
            : document.createElement(type);
        if (props) {
            for (let key in props) {
                if (key === 'children')
                    continue;
                if (key === 'ref') {
                    if (props.ref) {
                        props.ref.value = element;
                    }
                    continue;
                }
                let value = props[key];
                if (key === 'style') {
                    for (const property in value) {
                        const rawValue = statePropToWatchProp.statePropToWatchProp(value[property]);
                        if (typeof rawValue === 'function') {
                            new watchState.Watch(update => {
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
                    // @ts-expect-error TODO: fix types
                    element[key] = value;
                    continue;
                }
                const bothSet = key[0] === '$';
                const fieldSet = bothSet || key[0] === '_';
                const attributeSet = bothSet || !fieldSet;
                if (fieldSet) {
                    key = key.slice(1);
                }
                value = statePropToWatchProp.statePropToWatchProp(value);
                if (typeof value === 'function') {
                    new watchState.Watch(update => {
                        const result = value(update);
                        // @ts-expect-error TODO: fix types
                        if (fieldSet && element[key] !== result) {
                            // @ts-expect-error TODO: fix types
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
                        // @ts-expect-error TODO: fix types
                        element[key] = value;
                    }
                    if (attributeSet && value !== undefined) {
                        element.setAttribute(key, value);
                    }
                }
            }
        }
        innet__default["default"](element, handler);
        if (children) {
            const childrenHandler = Object.create(handler);
            setParent.setParent(childrenHandler, element);
            innet__default["default"](children, childrenHandler);
        }
    };
}

exports.NAMESPACE_URI = NAMESPACE_URI;
exports.domJSX = domJSX;
