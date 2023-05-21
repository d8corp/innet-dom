import { Observable } from 'watch-state';
import '../use/index.es6.js';
import { use } from '../use/use.es6.js';

function inject(value, callback) {
    if (value instanceof Observable || value instanceof Function) {
        return () => callback(use(value));
    }
    return callback(value);
}

export { inject };
