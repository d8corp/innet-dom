import innet from 'innet';

const domIterable = () => (apps, next, handler) => {
    let update = false;
    let result;
    for (const app of apps) {
        if (update)
            break;
        result = innet(app, handler);
        update = true;
    }
    return result;
};

export { domIterable };
