import innet from 'innet';
import { State, onDestroy, Watch, globalEvent } from 'watch-state';
import { remove, prepend, clear, after } from '../../../utils/dom/dom.es6.js';
import { setParent } from '../../../utils/setParent/setParent.es6.js';
import { useComment } from '../../../utils/useComment/useComment.es6.js';
import '@innet/jsx';

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
function loop({ props: { size: sizeProp = Infinity, key, of: ofProp, }, children: [callback, ...elseProp], }, handler) {
    if (typeof ofProp === 'function' || typeof sizeProp === 'function') {
        const [childHandler, mainComment] = useComment(handler, 'for');
        let map = new Map();
        let valuesList = [];
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
                const oldValuesList = valuesList;
                const oldMap = map;
                map = new Map();
                valuesList = [];
                let i = 0;
                for (const value of values) {
                    if (size <= i) {
                        break;
                    }
                    if (isElse) {
                        isElse = false;
                        clear(mainComment);
                    }
                    const valueKey = getKey(key, value);
                    if (map.has(valueKey)) {
                        continue;
                    }
                    if (valueKey === oldValuesList[i]) {
                        const data = oldMap.get(valueKey);
                        globalEvent.start();
                        data.item.value = value;
                        map.set(valueKey, data);
                        oldMap.delete(valueKey);
                        globalEvent.end();
                    }
                    else if (oldMap.has(value)) {
                        const data = oldMap.get(value);
                        oldMap.delete(valueKey);
                        data.item.index = i;
                        map.set(valueKey, data);
                        if (i) {
                            after(map.get(valuesList[i - 1]).comment, data.comment);
                        }
                        else {
                            prepend(mainComment, data.comment);
                        }
                    }
                    else {
                        const item = new LoopItem(value, i);
                        const comment = document.createComment(valueKey);
                        const deepHandler = Object.create(childHandler);
                        setParent(deepHandler, comment);
                        if (i) {
                            after(map.get(valuesList[i - 1]).comment, comment);
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
                    valuesList.push(valueKey);
                    i++;
                }
                oldMap.forEach(({ comment, watcher }) => {
                    watcher.destroy();
                    remove(comment);
                });
                if (!i && elseProp.length && !isElse) {
                    isElse = true;
                    innet(elseProp, childHandler);
                }
            }
            else {
                let i = 0;
                for (const value of values) {
                    if (size <= i) {
                        break;
                    }
                    const valueKey = getKey(key, value);
                    if (map.has(valueKey)) {
                        continue;
                    }
                    const [deepHandler, comment] = useComment(childHandler, valueKey, true);
                    const item = new LoopItem(value, i++);
                    valuesList.push(valueKey);
                    const watcher = new Watch(update => {
                        if (update) {
                            clear(comment);
                        }
                        innet(callback(item), deepHandler);
                    }, true);
                    map.set(valueKey, { comment, item, watcher });
                }
                if (!i && elseProp.length) {
                    isElse = true;
                    innet(elseProp, childHandler);
                }
            }
        });
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
