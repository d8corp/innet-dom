import { Context, useContext } from '@innet/jsx';

const mapIndexUnknown = Symbol('mapIndexUnknown');
const mapIndexContext = new Context(mapIndexUnknown);
function useMapIndex() {
    const index = useContext(mapIndexContext);
    if (index === mapIndexUnknown) {
        throw Error('useMapIndex should be used inside <map>...</map>');
    }
    return index;
}

export { mapIndexContext, useMapIndex };
