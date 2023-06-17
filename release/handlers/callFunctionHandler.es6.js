import { createHandler } from 'innet';
import '../plugins/callFunction/index.es6.js';
import { callFunction } from '../plugins/callFunction/callFunction.es6.js';

const callFunctionHandler = createHandler([callFunction]);

export { callFunctionHandler };
