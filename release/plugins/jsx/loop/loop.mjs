import innet from 'innet';
import { State, onDestroy, Watch } from 'watch-state';
import '../../../utils/index.mjs';
import { getComment } from '../../../utils/getComment/getComment.mjs';
import { remove, clear, after, before, prepend } from '../../../utils/dom/dom.mjs';
import { dif } from '../../../utils/dif/dif.mjs';
import { setParent } from '../../../utils/setParent/setParent.mjs';

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
function loop({ type, props: { size: sizeProp = Infinity, key, of: ofProp, }, children: [callback, ...elseProp], }, handler) {
    if (typeof ofProp === 'function' || typeof sizeProp === 'function') {
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
            const size = typeof sizeProp === 'function' ? sizeProp(update) : sizeProp;
            if (update) {
                const oldKeysList = keysList;
                keysList = values.map(value => getKey(key, value));
                const keepKeys = dif(oldKeysList, keysList);
                const oldMap = map;
                map = new Map();
                let index = 0;
                for (; index < values.length; index++) {
                    const value = values[index];
                    if (size <= index) {
                        break;
                    }
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
                        data.item.value = value;
                        data.item.index = index;
                        map.set(valueKey, data);
                        if (!keep && wasBefore) {
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
                if (!index && elseProp.length && !isElse) {
                    isElse = true;
                    innet(elseProp, childHandler);
                }
            }
            else {
                let index = 0;
                for (; index < values.length; index++) {
                    if (size <= index)
                        break;
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
                if (!index && elseProp.length && !isElse) {
                    isElse = true;
                    innet(elseProp, childHandler);
                }
            }
            // @ts-expect-error
        }).d8 = true;
        return mainComment;
    }
    else {
        const result = [];
        let index = 0;
        for (const value of ofProp) {
            if (sizeProp <= index) {
                break;
            }
            result.push(callback({ value, index }));
            index++;
        }
        if (!index) {
            if (elseProp.length) {
                return innet(elseProp, handler);
            }
        }
        else {
            return innet(result, handler);
        }
    }
}

export { LoopItem, loop };
