import innet from 'innet';
import { onDestroy, Watch, unwatch, createEvent, State } from 'watch-state';
import '../../../hooks/index.es6.js';
import '../../../utils/index.es6.js';
import { statePropToWatchProp } from '../../../utils/statePropToWatchProp/statePropToWatchProp.es6.js';
import { getComment } from '../../../utils/getComment/getComment.es6.js';
import { dif } from '../../../utils/dif/dif.es6.js';
import { mapValueContext } from '../../../hooks/useMapValue/useMapValue.es6.js';
import { mapIndexContext } from '../../../hooks/useMapIndex/useMapIndex.es6.js';
import { getParent } from '../../../utils/getParent/getParent.es6.js';
import { after, before, prepend, remove } from '../../../utils/dom/dom.es6.js';
import { setParent } from '../../../utils/setParent/setParent.es6.js';

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
const watcherKey = Symbol('watcherKey');
function map({ type, props: { key, of: ofState, }, children, }, handler) {
    if (!children || !ofState)
        return;
    const forProp = statePropToWatchProp(ofState);
    if (typeof forProp === 'function') {
        const [childHandler, mainComment] = getComment(handler, type);
        let keysList = [];
        const handlersMap = new Map();
        onDestroy(() => {
            handlersMap.forEach(({ [watcherKey]: watcher }) => watcher.destroy());
        });
        new Watch(update => {
            const values = forProp(update);
            if (update) {
                const oldKeysList = keysList;
                const oldKeysSet = new Set(oldKeysList);
                keysList = values.map(value => getKey(key, value));
                const keepKeys = dif(oldKeysList, keysList);
                for (let index = 0; index < values.length; index++) {
                    const value = values[index];
                    const valueKey = keysList[index];
                    const keep = keepKeys.includes(valueKey);
                    if (handlersMap.has(valueKey)) {
                        const deepHandler = handlersMap.get(valueKey);
                        unwatch(createEvent(() => {
                            mapValueContext.get(deepHandler).value = value;
                            mapIndexContext.get(deepHandler).value = index;
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
                        deepHandler[mapValueContext.key] = new State(value);
                        deepHandler[mapIndexContext.key] = new State(index);
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
                        deepHandler[watcherKey] = new Watch(() => {
                            innet(children, deepHandler);
                        }, true);
                    }
                    oldKeysSet.delete(valueKey);
                }
                oldKeysSet.forEach(valueKey => {
                    const deepHandler = handlersMap.get(valueKey);
                    handlersMap.delete(valueKey);
                    remove(getParent(deepHandler));
                    deepHandler[watcherKey].destroy();
                });
            }
            else {
                for (let index = 0; index < values.length; index++) {
                    const value = values[index];
                    const valueKey = getKey(key, value);
                    if (handlersMap.has(valueKey))
                        continue;
                    keysList.push(valueKey);
                    const [deepHandler] = getComment(childHandler, valueKey, true);
                    deepHandler[mapValueContext.key] = new State(value);
                    deepHandler[mapIndexContext.key] = new State(index);
                    handlersMap.set(valueKey, deepHandler);
                    deepHandler[watcherKey] = new Watch(() => {
                        innet(children, deepHandler);
                    }, true);
                }
            }
        });
        return mainComment;
    }
    else {
        const result = [];
        let i = 0;
        for (const value of forProp) {
            const childrenHandler = Object.create(handler);
            childrenHandler[mapValueContext.key] = value;
            childrenHandler[mapIndexContext.key] = i++;
            result.push(innet(children, childrenHandler));
        }
        return result;
    }
}

export { map };
