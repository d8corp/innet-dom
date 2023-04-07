import { Context, useContext } from '@innet/jsx';

const mapValueUnknown = Symbol('mapValueUnknown');
const mapValueContext = new Context(mapValueUnknown);
function useMapValue() {
    const value = useContext(mapValueContext);
    if (value === mapValueUnknown) {
        throw Error('useMapValue should be used inside <map>...</map>');
    }
    return value;
}

export { mapValueContext, useMapValue };
