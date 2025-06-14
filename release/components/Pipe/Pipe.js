'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('@innet/jsx/jsx-runtime');

function Pipe({ deep = 0, children }) {
    return children(jsxRuntime.jsx(Pipe, { deep: deep + 1, children: children }), deep);
}

exports.Pipe = Pipe;
