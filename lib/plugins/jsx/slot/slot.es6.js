import { useChildren, useHandler } from '@innet/jsx';
import innet from 'innet';
import { slotsContext } from '../slots/constants.es6.js';

function useSlots() {
    return getSlots(useHandler(), useChildren());
}
function getSlots(handler, from) {
    const result = {};
    if (Array.isArray(from)) {
        for (let i = 0; i < from.length; i++) {
            const child = from[i];
            if (child && typeof child === 'object' && !Array.isArray(child)) {
                const { type, props, children } = child;
                if (typeof type === 'string' && handler[type] === slot) {
                    const name = (props === null || props === void 0 ? void 0 : props.name) || '';
                    if (name in result) {
                        result[name].push(...children);
                    }
                    else {
                        result[name] = children;
                    }
                    continue;
                }
            }
            if ('' in result) {
                result[''].push(child);
            }
            else {
                result[''] = [child];
            }
        }
    }
    return result;
}
function slot({ props, children }, handler) {
    const slots = slotsContext.get(handler);
    const name = (props === null || props === void 0 ? void 0 : props.name) || '';
    return innet(name in slots ? slots[name] : children, handler);
}

export { getSlots, slot, useSlots };
