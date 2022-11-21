import { State, onDestroy } from 'watch-state';

function useShow(delay = 100) {
    const show = new State(false);
    const timer = setTimeout(() => {
        show.value = true;
    }, delay);
    onDestroy(() => {
        clearTimeout(timer);
    });
    return show;
}

export { useShow };
