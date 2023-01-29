'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
require('../../../utils/index.js');
var statePropToWatchProp = require('../../../utils/statePropToWatchProp/statePropToWatchProp.js');
var getComment = require('../../../utils/getComment/getComment.js');
var dom = require('../../../utils/dom/dom.js');
var dif = require('../../../utils/dif/dif.js');
var setParent = require('../../../utils/setParent/setParent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

class LoopItem {
    constructor(value, index) {
        this._index = new watchState.State(index);
        this._value = new watchState.State(value);
    }
    get value() {
        return this._value.value;
    }
    set value(value) {
        this._value.value = value;
    }
    get index() {
        return this._index.value;
    }
    set index(index) {
        this._index.value = index;
    }
}
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
function loop({ type, props: { key, of: ofState, }, children: [callback,], }, handler) {
    const ofProp = statePropToWatchProp.statePropToWatchProp(ofState);
    if (typeof ofProp === 'function') {
        const [childHandler, mainComment] = getComment.getComment(handler, type);
        let map = new Map();
        let keysList = [];
        let isElse = false;
        watchState.onDestroy(() => {
            map.forEach(({ watcher, comment }) => {
                watcher.destroy();
                dom.remove(comment);
            });
        });
        new watchState.Watch(update => {
            const values = typeof ofProp === 'function' ? ofProp(update) : ofProp;
            if (update) {
                const oldKeysList = keysList;
                keysList = values.map(value => getKey(key, value));
                const keepKeys = dif.dif(oldKeysList, keysList);
                const oldMap = map;
                map = new Map();
                let index = 0;
                for (; index < values.length; index++) {
                    const value = values[index];
                    if (isElse) {
                        isElse = false;
                        dom.clear(mainComment);
                    }
                    const valueKey = keysList[index];
                    if (map.has(valueKey)) {
                        continue;
                    }
                    const keep = keepKeys === null || keepKeys === void 0 ? void 0 : keepKeys.includes(valueKey);
                    const wasBefore = oldMap.has(valueKey);
                    if (wasBefore) {
                        const data = oldMap.get(valueKey);
                        watchState.unwatch(() => {
                            data.item.value = value;
                            data.item.index = index;
                        });
                        map.set(valueKey, data);
                        if (!keep) {
                            if (index) {
                                dom.after(map.get(keysList[index - 1]).comment, data.comment);
                            }
                            else if (oldKeysList.length) {
                                dom.before(oldMap.get(oldKeysList[0]).comment, data.comment);
                            }
                            else {
                                dom.prepend(mainComment, data.comment);
                            }
                        }
                        oldMap.delete(valueKey);
                    }
                    else {
                        const item = new LoopItem(value, index);
                        const comment = document.createComment(valueKey);
                        const deepHandler = Object.create(childHandler);
                        setParent.setParent(deepHandler, comment);
                        if (index) {
                            dom.after(map.get(keysList[index - 1]).comment, comment);
                        }
                        else if (oldKeysList.length) {
                            dom.before(oldMap.get(oldKeysList[0]).comment, comment);
                        }
                        else {
                            dom.prepend(mainComment, comment);
                        }
                        const watcher = new watchState.Watch(update => {
                            if (update) {
                                dom.clear(comment);
                            }
                            innet__default["default"](callback(item), deepHandler);
                        }, true);
                        map.set(valueKey, { comment, item, watcher });
                    }
                }
                oldMap.forEach(({ comment, watcher }) => {
                    watcher.destroy();
                    dom.remove(comment);
                });
            }
            else {
                let index = 0;
                for (; index < values.length; index++) {
                    const value = values[index];
                    const valueKey = getKey(key, value);
                    if (map.has(valueKey))
                        continue;
                    keysList.push(valueKey);
                    const [deepHandler, comment] = getComment.getComment(childHandler, valueKey, true);
                    const item = new LoopItem(value, index);
                    const watcher = new watchState.Watch(update => {
                        if (update) {
                            dom.clear(comment);
                        }
                        innet__default["default"](callback(item), deepHandler);
                    }, true);
                    map.set(valueKey, { comment, item, watcher });
                }
            }
        });
        return mainComment;
    }
    else {
        const result = [];
        for (const value of ofProp) {
            result.push(callback({ value, index: result.length }));
        }
        return innet__default["default"](result, handler);
    }
}

exports.LoopItem = LoopItem;
exports.loop = loop;
