'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SyncTimer = require('sync-timer');
var constants = require('./constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var SyncTimer__default = /*#__PURE__*/_interopDefaultLegacy(SyncTimer);

function removeParentChild(target) {
    if (target._parent) {
        const children = target._parent._children;
        children.splice(children.indexOf(target), 1);
        target._parent = undefined;
    }
}
function removeElements(target, delay = target[constants.REMOVE_DELAY]) {
    if (delay) {
        new SyncTimer__default["default"](() => { target.remove(); }, delay);
    }
    else {
        target.remove();
    }
    if (target instanceof Comment) {
        clear(target, delay);
    }
}
function updateChildren(target) {
    if (target instanceof Comment) {
        if (target._children) {
            target.before.apply(target, target._children);
            target._children.forEach(updateChildren);
        }
        else {
            target._children = [];
        }
    }
}
function insertChild(target, node, offset = 0) {
    if (target._parent) {
        const parent = node._parent = target._parent;
        parent._children.splice(parent._children.indexOf(target) - offset, 0, node);
    }
}
function clear(target, delay) {
    target._children.forEach(target => { removeElements(target, delay); });
    target._children = [];
}
function remove(target) {
    removeParentChild(target);
    removeElements(target);
}
function simpleBefore(target, node) {
    if (target instanceof Comment) {
        if (target._children.length) {
            simpleBefore(target._children[0], node);
        }
        else {
            target.before(node);
        }
    }
    else {
        target.before(node);
    }
}
function before(target, node) {
    removeParentChild(node);
    insertChild(target, node, 1);
    simpleBefore(target, node);
    updateChildren(node);
}
function prepend(target, node) {
    removeParentChild(node);
    if (target instanceof Comment) {
        node._parent = target;
        if (!target._children) {
            target._children = [];
        }
        target._children.unshift(node);
        (target._children[1] || target).before(node);
    }
    else {
        target.prepend(node);
    }
    updateChildren(node);
}
function append(target, node) {
    removeParentChild(node);
    if (target instanceof Comment) {
        node._parent = target;
        if (!target._children) {
            target._children = [];
        }
        target._children.push(node);
        target.before(node);
    }
    else {
        target.appendChild(node);
    }
    updateChildren(node);
}
function after(target, node) {
    removeParentChild(node);
    insertChild(target, node);
    target.after(node);
    updateChildren(node);
}

exports.after = after;
exports.append = append;
exports.before = before;
exports.clear = clear;
exports.prepend = prepend;
exports.remove = remove;
