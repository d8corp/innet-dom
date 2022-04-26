'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var innet = require('innet');
var watchState = require('watch-state');
var dom = require('../../../utils/dom/dom.js');
var setParent = require('../../../utils/setParent/setParent.js');
var useComment = require('../../../utils/useComment/useComment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

var LoopItem = /** @class */ (function () {
    function LoopItem(value, index) {
        this._index = new watchState.State(index);
        this._value = new watchState.State(value);
    }
    Object.defineProperty(LoopItem.prototype, "value", {
        get: function () {
            return this._value.value;
        },
        set: function (value) {
            this._value.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoopItem.prototype, "index", {
        get: function () {
            return this._index.value;
        },
        set: function (index) {
            this._index.value = index;
        },
        enumerable: false,
        configurable: true
    });
    return LoopItem;
}());
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
function loop(_a, handler) {
    var e_1, _b;
    var _c = _a.props, _d = _c.size, sizeProp = _d === void 0 ? Infinity : _d, key = _c.key, ofProp = _c.of, _e = tslib.__read(_a.children), callback = _e[0], elseProp = _e.slice(1);
    if (typeof ofProp === 'function' || typeof sizeProp === 'function') {
        var _f = tslib.__read(useComment.useComment(handler, 'for'), 2), childHandler_1 = _f[0], mainComment_1 = _f[1];
        var map_1 = new Map();
        var valuesList_1 = [];
        var isElse_1 = false;
        watchState.onDestroy(function () {
            map_1.forEach(function (_a) {
                var watcher = _a.watcher, comment = _a.comment;
                watcher.destroy();
                dom.remove(comment);
            });
        });
        new watchState.Watch(function (update) {
            var e_2, _a, e_3, _b;
            var values = typeof ofProp === 'function' ? ofProp(update) : ofProp;
            var size = typeof sizeProp === 'function' ? sizeProp(update) : sizeProp;
            if (update) {
                var oldValuesList = valuesList_1;
                var oldMap = map_1;
                map_1 = new Map();
                valuesList_1 = [];
                var i = 0;
                var _loop_1 = function (value) {
                    if (size <= i) {
                        return "break";
                    }
                    if (isElse_1) {
                        isElse_1 = false;
                        dom.clear(mainComment_1);
                    }
                    var valueKey = getKey(key, value);
                    if (map_1.has(valueKey)) {
                        return "continue";
                    }
                    if (valueKey === oldValuesList[i]) {
                        var data = oldMap.get(valueKey);
                        watchState.globalEvent.start();
                        data.item.value = value;
                        map_1.set(valueKey, data);
                        oldMap.delete(valueKey);
                        watchState.globalEvent.end();
                    }
                    else if (oldMap.has(value)) {
                        var data = oldMap.get(value);
                        oldMap.delete(valueKey);
                        data.item.index = i;
                        map_1.set(valueKey, data);
                        if (i) {
                            dom.after(map_1.get(valuesList_1[i - 1]).comment, data.comment);
                        }
                        else {
                            dom.prepend(mainComment_1, data.comment);
                        }
                    }
                    else {
                        var item_1 = new LoopItem(value, i);
                        var comment_1 = document.createComment(valueKey);
                        var deepHandler_1 = Object.create(childHandler_1);
                        setParent.setParent(deepHandler_1, comment_1);
                        if (i) {
                            dom.after(map_1.get(valuesList_1[i - 1]).comment, comment_1);
                        }
                        else {
                            dom.prepend(mainComment_1, comment_1);
                        }
                        var watcher = new watchState.Watch(function (update) {
                            if (update) {
                                dom.clear(comment_1);
                            }
                            innet__default["default"](callback(item_1), deepHandler_1);
                        }, true);
                        map_1.set(valueKey, { comment: comment_1, item: item_1, watcher: watcher });
                    }
                    valuesList_1.push(valueKey);
                    i++;
                };
                try {
                    for (var values_1 = tslib.__values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                        var value = values_1_1.value;
                        var state_1 = _loop_1(value);
                        if (state_1 === "break")
                            break;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                oldMap.forEach(function (_a) {
                    var comment = _a.comment, watcher = _a.watcher;
                    watcher.destroy();
                    dom.remove(comment);
                });
                if (!i && elseProp.length && !isElse_1) {
                    isElse_1 = true;
                    innet__default["default"](elseProp, childHandler_1);
                }
            }
            else {
                var i = 0;
                var _loop_2 = function (value) {
                    if (size <= i) {
                        return "break";
                    }
                    var valueKey = getKey(key, value);
                    if (map_1.has(valueKey)) {
                        return "continue";
                    }
                    var _c = tslib.__read(useComment.useComment(childHandler_1, valueKey, true), 2), deepHandler = _c[0], comment = _c[1];
                    var item = new LoopItem(value, i++);
                    valuesList_1.push(valueKey);
                    var watcher = new watchState.Watch(function (update) {
                        if (update) {
                            dom.clear(comment);
                        }
                        innet__default["default"](callback(item), deepHandler);
                    }, true);
                    map_1.set(valueKey, { comment: comment, item: item, watcher: watcher });
                };
                try {
                    for (var values_2 = tslib.__values(values), values_2_1 = values_2.next(); !values_2_1.done; values_2_1 = values_2.next()) {
                        var value = values_2_1.value;
                        var state_2 = _loop_2(value);
                        if (state_2 === "break")
                            break;
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (values_2_1 && !values_2_1.done && (_b = values_2.return)) _b.call(values_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                if (!i && elseProp.length) {
                    isElse_1 = true;
                    innet__default["default"](elseProp, childHandler_1);
                }
            }
        });
        return mainComment_1;
    }
    else {
        var result = [];
        var index = 0;
        try {
            for (var ofProp_1 = tslib.__values(ofProp), ofProp_1_1 = ofProp_1.next(); !ofProp_1_1.done; ofProp_1_1 = ofProp_1.next()) {
                var value = ofProp_1_1.value;
                if (sizeProp <= index) {
                    break;
                }
                result.push(callback({ value: value, index: index }));
                index++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (ofProp_1_1 && !ofProp_1_1.done && (_b = ofProp_1.return)) _b.call(ofProp_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!index) {
            if (elseProp.length) {
                return innet__default["default"](elseProp, handler);
            }
        }
        else {
            return innet__default["default"](result, handler);
        }
    }
}

exports.LoopItem = LoopItem;
exports.loop = loop;
