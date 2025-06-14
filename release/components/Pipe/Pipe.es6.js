import { jsx } from '@innet/jsx/jsx-runtime';

function Pipe({ deep = 0, children }) {
    return children(jsx(Pipe, { deep: deep + 1, children: children }), deep);
}

export { Pipe };
