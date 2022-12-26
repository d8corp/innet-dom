import { State, Cache } from 'watch-state';
import '../use/index.es6.js';
import { use } from '../use/use.es6.js';

function inject(value, callback) {
    if (value instanceof State || value instanceof Cache || value instanceof Function) {
        return () => callback(use(value));
    }
    return callback(value);
}

export { inject };
