'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');

const mapValueUnknown = Symbol('mapValueUnknown');
const mapValueContext = new jsx.Context(mapValueUnknown);
function useMapValue() {
    const value = jsx.useContext(mapValueContext);
    if (value === mapValueUnknown) {
        throw Error('useMapValue should be used inside <map>...</map>');
    }
    return value;
}

exports.mapValueContext = mapValueContext;
exports.useMapValue = useMapValue;
