'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
require('../../../hooks/index.js');
require('../../../utils/index.js');
var statePropToWatchProp = require('../../../utils/statePropToWatchProp/statePropToWatchProp.js');
var getComment = require('../../../utils/getComment/getComment.js');
var dif = require('../../../utils/dif/dif.js');
var useMapValue = require('../../../hooks/useMapValue/useMapValue.js');
var useMapIndex = require('../../../hooks/useMapIndex/useMapIndex.js');
var getParent = require('../../../utils/getParent/getParent.js');
var dom = require('../../../utils/dom/dom.js');
var setParent = require('../../../utils/setParent/setParent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

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
function map() {
    const handler = innet.useHandler();
    const { type, props: { key, of: ofState, }, children, } = innet.useApp();
    if (!children || !ofState)
        return;
    const forProp = statePropToWatchProp.statePropToWatchProp(ofState);
    if (typeof forProp === 'function') {
        const [childHandler, mainComment] = getComment.getComment(handler, type);
        let keysList = [];
        const handlersMap = new Map();
        watchState.onDestroy(() => {
            handlersMap.forEach(({ [watcherKey]: watcher }) => watcher.destroy());
        });
        new watchState.Watch(update => {
            const values = forProp(update);
            if (update) {
                const oldKeysList = keysList;
                const oldKeysSet = new Set(oldKeysList);
                keysList = values.map(value => getKey(key, value));
                const keepKeys = dif.dif(oldKeysList, keysList);
                for (let index = 0; index < values.length; index++) {
                    const value = values[index];
                    const valueKey = keysList[index];
                    const keep = keepKeys === null || keepKeys === void 0 ? void 0 : keepKeys.includes(valueKey);
                    if (handlersMap.has(valueKey)) {
                        const deepHandler = handlersMap.get(valueKey);
                        watchState.unwatch(watchState.createEvent(() => {
                            useMapValue.mapValueContext.get(deepHandler).value = value;
                            useMapIndex.mapIndexContext.get(deepHandler).value = index;
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
                        deepHandler[useMapValue.mapValueContext.key] = new watchState.State(value);
                        deepHandler[useMapIndex.mapIndexContext.key] = new watchState.State(index);
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
                        deepHandler[watcherKey] = new watchState.Watch(() => {
                            innet__default["default"](children, deepHandler);
                        }, true);
                    }
                    oldKeysSet.delete(valueKey);
                }
                oldKeysSet.forEach(valueKey => {
                    const deepHandler = handlersMap.get(valueKey);
                    handlersMap.delete(valueKey);
                    dom.remove(getParent.getParent(deepHandler));
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
                    const [deepHandler] = getComment.getComment(childHandler, valueKey, true);
                    deepHandler[useMapValue.mapValueContext.key] = new watchState.State(value);
                    deepHandler[useMapIndex.mapIndexContext.key] = new watchState.State(index);
                    handlersMap.set(valueKey, deepHandler);
                    deepHandler[watcherKey] = new watchState.Watch(() => {
                        innet__default["default"](children, deepHandler);
                    }, true);
                }
            }
        });
    }
    else {
        let i = 0;
        for (const value of forProp) {
            const childrenHandler = Object.create(handler);
            childrenHandler[useMapValue.mapValueContext.key] = value;
            childrenHandler[useMapIndex.mapIndexContext.key] = i++;
            innet__default["default"](children, childrenHandler);
        }
    }
}

exports.map = map;
