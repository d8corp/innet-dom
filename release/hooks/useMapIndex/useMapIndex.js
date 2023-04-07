'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');

const mapIndexUnknown = Symbol('mapIndexUnknown');
const mapIndexContext = new jsx.Context(mapIndexUnknown);
function useMapIndex() {
    const index = jsx.useContext(mapIndexContext);
    if (index === mapIndexUnknown) {
        throw Error('useMapIndex should be used inside <map>...</map>');
    }
    return index;
}

exports.mapIndexContext = mapIndexContext;
exports.useMapIndex = useMapIndex;
