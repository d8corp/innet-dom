import { onDestroy } from 'watch-state';
import '../setTimeoutSync/index.es6.js';
import { setTimeoutSync } from '../setTimeoutSync/setTimeoutSync.es6.js';

function onMounted(callback, delay) {
    let destroyed = false;
    onDestroy(() => {
        destroyed = true;
    });
    setTimeoutSync(() => {
        if (!destroyed) {
            callback();
        }
    }, delay);
}

export { onMounted };
