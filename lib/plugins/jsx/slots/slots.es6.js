import innet from 'innet';
import { createContextHandler } from '../context/context.es6.js';
import { getSlots } from '../slot/slot.es6.js';
import { slotsContext } from './constants.es6.js';

function slots({ props: { from }, children }, handler) {
    return innet(children, createContextHandler(handler, slotsContext, getSlots(handler, from)));
}

export { slots };
