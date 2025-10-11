import SyncTimer from 'sync-timer';
import { onDestroy } from 'watch-state';

function onMounted(callback, delay) {
    const timer = new SyncTimer(callback, delay);
    onDestroy(() => {
        timer.cancel();
    });
}

export { onMounted };
