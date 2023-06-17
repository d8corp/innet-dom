import { createHandler } from 'innet'

import { callFunction } from '../plugins/callFunction'

export const callFunctionHandler = createHandler([callFunction])
