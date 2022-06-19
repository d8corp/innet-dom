'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
var setParent = require('../../utils/setParent/setParent.js');
require('@innet/jsx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function domJSX() {
    return function (_a, next, handler) {
        var type = _a.type, props = _a.props, children = _a.children;
        if (typeof type === 'string') {
            var element_1 = document.createElement(type);
            if (props) {
                var _loop_1 = function (key) {
                    if (key === 'ref') {
                        props.ref.value = element_1;
                    }
                    else {
                        var value_1 = props[key];
                        if (key.startsWith('on')) {
                            element_1[key] = value_1;
                        }
                        else {
                            var bothSet = key[0] === '$';
                            var fieldSet_1 = bothSet || key[0] === '_';
                            var attributeSet_1 = bothSet || !fieldSet_1;
                            if (fieldSet_1) {
                                key = key.slice(1);
                            }
                            if (typeof value_1 === 'function') {
                                new watchState.Watch(function (update) {
                                    var result = value_1(update);
                                    if (fieldSet_1) {
                                        element_1[key] = result;
                                    }
                                    if (attributeSet_1) {
                                        if (result === undefined) {
                                            element_1.removeAttribute(key);
                                        }
                                        else {
                                            element_1.setAttribute(key, result);
                                        }
                                    }
                                });
                            }
                            else {
                                if (fieldSet_1) {
                                    element_1[key] = value_1;
                                }
                                if (attributeSet_1 && value_1 !== undefined) {
                                    element_1.setAttribute(key, value_1);
                                }
                            }
                        }
                    }
                };
                for (var key in props) {
                    _loop_1(key);
                }
            }
            var result = innet__default["default"](element_1, handler);
            if (children) {
                var childrenHandler = Object.create(handler);
                setParent.setParent(childrenHandler, element_1);
                return innet__default["default"](children, childrenHandler);
            }
            return result;
        }
        return next();
    };
}

exports.domJSX = domJSX;
