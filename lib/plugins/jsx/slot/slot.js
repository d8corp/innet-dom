'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsx = require('@innet/jsx');
var innet = require('innet');
var constants = require('../slots/constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function useSlots() {
    return getSlots(jsx.useHandler(), jsx.useChildren());
}
function getSlots(handler, from) {
    var _a;
    var result = {};
    if (Array.isArray(from)) {
        for (var i = 0; i < from.length; i++) {
            var child = from[i];
            if (child && typeof child === 'object' && !Array.isArray(child)) {
                var type = child.type, props = child.props, children = child.children;
                if (typeof type === 'string' && handler[type] === slot) {
                    var name_1 = (props === null || props === void 0 ? void 0 : props.name) || '';
                    if (name_1 in result) {
                        (_a = result[name_1]).push.apply(_a, tslib.__spreadArray([], tslib.__read(children), false));
                    }
                    else {
                        result[name_1] = children;
                    }
                    continue;
                }
            }
            if ('' in result) {
                result[''].push(child);
            }
            else {
                result[''] = [child];
            }
        }
    }
    return result;
}
function slot(_a, handler) {
    var props = _a.props, children = _a.children;
    var slots = constants.slotsContext.get(handler);
    var name = (props === null || props === void 0 ? void 0 : props.name) || '';
    return innet__default["default"](name in slots ? slots[name] : children, handler);
}

exports.getSlots = getSlots;
exports.slot = slot;
exports.useSlots = useSlots;
