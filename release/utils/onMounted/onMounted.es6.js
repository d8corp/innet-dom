import SyncTimer from 'sync-timer';
import { onDestroy } from 'watch-state';

function onMounted(callback, delay) {
    let destroyed = false;
    onDestroy(() => {
        destroyed = true;
    });
    new SyncTimer(() => {
        if (!destroyed) {
            callback();
        }
    }, delay);
}

export { onMounted };
