'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var innet = require('innet');
var watchState = require('watch-state');
require('../../utils/index.js');
var statePropToWatchProp = require('../../utils/statePropToWatchProp/statePropToWatchProp.js');
var getComment = require('../../utils/getComment/getComment.js');
var lcs = require('../../utils/lcs/lcs.js');
var getParent = require('../../utils/getParent/getParent.js');
var dom = require('../../utils/dom/dom.js');
var setParent = require('../../utils/setParent/setParent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const FOR_VALUE = Symbol('FOR_VALUE');
const FOR_INDEX = Symbol('FOR_INDEX');
const WATCHER_KEY = Symbol('WATCHER_KEY');
function getKey(key, value) {
    if (typeof key === 'function') {
        return key(value);
    }
    else if (key === undefined) {
        return value;
    }
    else {
        return value[key];
    }
}
function For({ key, of: ofPropRaw, children, }) {
    if (!children || !ofPropRaw)
        return jsx.EMPTY;
    const ofProp = statePropToWatchProp.statePropToWatchProp(ofPropRaw);
    if (typeof ofProp !== 'function')
        return Array.from(ofProp).map(children);
    const handler = innet.useHandler();
    const [childHandler, mainComment] = getComment.getComment(handler, 'For');
    let keysList = [];
    const handlersMap = new Map();
    watchState.onDestroy(() => {
        handlersMap.forEach(({ [WATCHER_KEY]: watcher }) => watcher.destroy());
    });
    new watchState.Watch(update => {
        const values = ofProp(update);
        if (!update) {
            let index = 0;
            for (const value of values) {
                const valueKey = getKey(key, value);
                if (handlersMap.has(valueKey))
                    continue;
                keysList.push(valueKey);
                const [deepHandler] = getComment.getComment(childHandler, valueKey, true);
                deepHandler[FOR_VALUE] = new watchState.State(value);
                deepHandler[FOR_INDEX] = new watchState.State(index++);
                handlersMap.set(valueKey, deepHandler);
                deepHandler[WATCHER_KEY] = new watchState.Watch(() => {
                    innet__default["default"](children(deepHandler[FOR_VALUE], deepHandler[FOR_INDEX]), deepHandler);
                }, true);
            }
            return;
        }
        const oldKeysList = keysList;
        const oldKeysSet = new Set(oldKeysList);
        keysList = [];
        for (const value of values) {
            keysList.push(getKey(key, value));
        }
        const keepKeys = new Set(lcs.lcs(oldKeysList, keysList));
        let i = 0;
        for (const value of values) {
            const index = i++;
            const valueKey = keysList[index];
            if (handlersMap.has(valueKey)) {
                const keep = keepKeys.has(valueKey);
                const deepHandler = handlersMap.get(valueKey);
                watchState.unwatch(watchState.createEvent(() => {
                    deepHandler[FOR_VALUE].value = value;
                    deepHandler[FOR_INDEX].value = index;
                }));
                if (!keep) {
                    const comment = getParent.getParent(deepHandler);
                    if (index) {
                        dom.after(getParent.getParent(handlersMap.get(keysList[index - 1])), comment);
                    }
                    else if (oldKeysList.length) {
                        dom.before(getParent.getParent(handlersMap.get(oldKeysList[0])), comment);
                    }
                    else {
                        dom.prepend(mainComment, comment);
                    }
                }
            }
            else {
                const comment = document.createComment(valueKey);
                const deepHandler = Object.create(childHandler);
                setParent.setParent(deepHandler, comment);
                deepHandler[FOR_VALUE] = new watchState.State(value);
                deepHandler[FOR_INDEX] = new watchState.State(index);
                handlersMap.set(valueKey, deepHandler);
                if (index) {
                    dom.after(getParent.getParent(handlersMap.get(keysList[index - 1])), comment);
                }
                else if (oldKeysList.length) {
                    dom.before(getParent.getParent(handlersMap.get(oldKeysList[0])), comment);
                }
                else {
                    dom.prepend(mainComment, comment);
                }
                deepHandler[WATCHER_KEY] = new watchState.Watch(() => {
                    innet__default["default"](children(deepHandler[FOR_VALUE], deepHandler[FOR_INDEX]), deepHandler);
                }, true);
            }
            oldKeysSet.delete(valueKey);
        }
        oldKeysSet.forEach(valueKey => {
            const deepHandler = handlersMap.get(valueKey);
            handlersMap.delete(valueKey);
            dom.remove(getParent.getParent(deepHandler));
            deepHandler[WATCHER_KEY].destroy();
        });
    });
    return jsx.EMPTY;
}

exports.FOR_INDEX = FOR_INDEX;
exports.FOR_VALUE = FOR_VALUE;
exports.For = For;
