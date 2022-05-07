import innet from 'innet';
import { Context, createContextHandler } from '../context/context.es6.js';
import { getSlots } from '../slot/slot.es6.js';

const slotsContext = new Context({});
function slots({ props: { from }, children }, handler) {
    return innet(children, createContextHandler(handler, slotsContext, getSlots(handler, from)));
}

export { slots, slotsContext };
