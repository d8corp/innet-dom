import { EMPTY } from '@innet/jsx';
import innet, { useHandler } from 'innet';
import { onDestroy, Watch, State, unwatch, createEvent } from 'watch-state';
import '../../utils/index.es6.js';
import { statePropToWatchProp } from '../../utils/statePropToWatchProp/statePropToWatchProp.es6.js';
import { getComment } from '../../utils/getComment/getComment.es6.js';
import { lcs } from '../../utils/lcs/lcs.es6.js';
import { getParent } from '../../utils/getParent/getParent.es6.js';
import { after, before, prepend, remove } from '../../utils/dom/dom.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';

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
        return EMPTY;
    const ofProp = statePropToWatchProp(ofPropRaw);
    if (typeof ofProp !== 'function')
        return Array.from(ofProp).map(children);
    const handler = useHandler();
    const [childHandler, mainComment] = getComment(handler, 'For');
    let keysList = [];
    const handlersMap = new Map();
    onDestroy(() => {
        handlersMap.forEach(({ [WATCHER_KEY]: watcher }) => watcher.destroy());
    });
    new Watch(update => {
        const values = ofProp(update);
        if (!update) {
            let index = 0;
            for (const value of values) {
                const valueKey = getKey(key, value);
                if (handlersMap.has(valueKey))
                    continue;
                keysList.push(valueKey);
                const [deepHandler] = getComment(childHandler, valueKey, true);
                deepHandler[FOR_VALUE] = new State(value);
                deepHandler[FOR_INDEX] = new State(index++);
                handlersMap.set(valueKey, deepHandler);
                deepHandler[WATCHER_KEY] = new Watch(() => {
                    innet(children(deepHandler[FOR_VALUE], deepHandler[FOR_INDEX]), deepHandler);
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
        const keepKeys = new Set(lcs(oldKeysList, keysList));
        let i = 0;
        for (const value of values) {
            const index = i++;
            const valueKey = keysList[index];
            if (handlersMap.has(valueKey)) {
                const keep = keepKeys.has(valueKey);
                const deepHandler = handlersMap.get(valueKey);
                unwatch(createEvent(() => {
                    deepHandler[FOR_VALUE].value = value;
                    deepHandler[FOR_INDEX].value = index;
                }));
                if (!keep) {
                    const comment = getParent(deepHandler);
                    if (index) {
                        after(getParent(handlersMap.get(keysList[index - 1])), comment);
                    }
                    else if (oldKeysList.length) {
                        before(getParent(handlersMap.get(oldKeysList[0])), comment);
                    }
                    else {
                        prepend(mainComment, comment);
                    }
                }
            }
            else {
                const comment = document.createComment(valueKey);
                const deepHandler = Object.create(childHandler);
                setParent(deepHandler, comment);
                deepHandler[FOR_VALUE] = new State(value);
                deepHandler[FOR_INDEX] = new State(index);
                handlersMap.set(valueKey, deepHandler);
                if (index) {
                    after(getParent(handlersMap.get(keysList[index - 1])), comment);
                }
                else if (oldKeysList.length) {
                    before(getParent(handlersMap.get(oldKeysList[0])), comment);
                }
                else {
                    prepend(mainComment, comment);
                }
                deepHandler[WATCHER_KEY] = new Watch(() => {
                    innet(children(deepHandler[FOR_VALUE], deepHandler[FOR_INDEX]), deepHandler);
                }, true);
            }
            oldKeysSet.delete(valueKey);
        }
        oldKeysSet.forEach(valueKey => {
            const deepHandler = handlersMap.get(valueKey);
            handlersMap.delete(valueKey);
            remove(getParent(deepHandler));
            deepHandler[WATCHER_KEY].destroy();
        });
    });
    return EMPTY;
}

export { FOR_INDEX, FOR_VALUE, For };
