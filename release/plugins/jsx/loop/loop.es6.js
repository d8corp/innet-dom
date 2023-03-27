import innet from 'innet';
import { State, onDestroy, Watch, unwatch, createEvent } from 'watch-state';
import '../../../utils/index.es6.js';
import { statePropToWatchProp } from '../../../utils/statePropToWatchProp/statePropToWatchProp.es6.js';
import { getComment } from '../../../utils/getComment/getComment.es6.js';
import { remove, clear, after, before, prepend } from '../../../utils/dom/dom.es6.js';
import { dif } from '../../../utils/dif/dif.es6.js';
import { setParent } from '../../../utils/setParent/setParent.es6.js';

class LoopItem {
    constructor(value, index) {
        this._index = new State(index);
        this._value = new State(value);
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
    const ofProp = statePropToWatchProp(ofState);
    if (typeof ofProp === 'function') {
        const [childHandler, mainComment] = getComment(handler, type);
        let map = new Map();
        let keysList = [];
        let isElse = false;
        onDestroy(() => {
            map.forEach(({ watcher, comment }) => {
                watcher.destroy();
                remove(comment);
            });
        });
        new Watch(update => {
            const values = typeof ofProp === 'function' ? ofProp(update) : ofProp;
            if (update) {
                const oldKeysList = keysList;
                keysList = values.map(value => getKey(key, value));
                const keepKeys = dif(oldKeysList, keysList);
                const oldMap = map;
                map = new Map();
                let index = 0;
                for (; index < values.length; index++) {
                    const value = values[index];
                    if (isElse) {
                        isElse = false;
                        clear(mainComment);
                    }
                    const valueKey = keysList[index];
                    if (map.has(valueKey)) {
                        continue;
                    }
                    const keep = keepKeys === null || keepKeys === void 0 ? void 0 : keepKeys.includes(valueKey);
                    const wasBefore = oldMap.has(valueKey);
                    if (wasBefore) {
                        const data = oldMap.get(valueKey);
                        unwatch(createEvent(() => {
                            data.item.value = value;
                            data.item.index = index;
                        }));
                        map.set(valueKey, data);
                        if (!keep) {
                            if (index) {
                                after(map.get(keysList[index - 1]).comment, data.comment);
                            }
                            else if (oldKeysList.length) {
                                before(oldMap.get(oldKeysList[0]).comment, data.comment);
                            }
                            else {
                                prepend(mainComment, data.comment);
                            }
                        }
                        oldMap.delete(valueKey);
                    }
                    else {
                        const item = new LoopItem(value, index);
                        const comment = document.createComment(valueKey);
                        const deepHandler = Object.create(childHandler);
                        setParent(deepHandler, comment);
                        if (index) {
                            after(map.get(keysList[index - 1]).comment, comment);
                        }
                        else if (oldKeysList.length) {
                            before(oldMap.get(oldKeysList[0]).comment, comment);
                        }
                        else {
                            prepend(mainComment, comment);
                        }
                        const watcher = new Watch(update => {
                            if (update) {
                                clear(comment);
                            }
                            innet(callback(item), deepHandler);
                        }, true);
                        map.set(valueKey, { comment, item, watcher });
                    }
                }
                oldMap.forEach(({ comment, watcher }) => {
                    watcher.destroy();
                    remove(comment);
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
                    const [deepHandler, comment] = getComment(childHandler, valueKey, true);
                    const item = new LoopItem(value, index);
                    const watcher = new Watch(update => {
                        if (update) {
                            clear(comment);
                        }
                        innet(callback(item), deepHandler);
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
        return innet(result, handler);
    }
}

export { LoopItem, loop };
